import React, { useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import { InfoCircle } from "../../../components/icons/Icon";
import { Container } from "../../../components/layouts/Container";
import { Section } from "../../../components/layouts/Section";
import { Spacer } from "../../../components/layouts/Spacer";
import { TrimmedImage } from "../../../components/media/TrimmedImage";
import { Footer } from "../../../components/navs/Footer";
import { TabNav } from "../../../components/navs/TabNav";
import { Heading } from "../../../components/typographies/Heading";
import { useFetch } from "../../../hooks/useFetch";
import { Color, Radius, Space } from "../../../styles/variables";
import { formatTime, isBefore } from "../../../utils/DateUtils";
import { jsonFetcher } from "../../../utils/HttpUtils";
import { convertJpgToWebp } from "../../../utils/convertJpgToWebp";

import { OddsRankingList } from "./internal/OddsRankingList";
import { OddsTable } from "./internal/OddsTable";
import { TicketVendingModal } from "./internal/TicketVendingModal";

const LiveBadge = styled.span`
  background: ${Color.red};
  border-radius: ${Radius.SMALL};
  color: ${Color.mono[0]};
  font-weight: bold;
  padding: ${Space * 1}px;
  text-transform: uppercase;
`;

const Callout = styled.aside`
  align-items: center;
  background: ${({ $closed }) =>
    $closed ? Color.mono[200] : Color.green[100]};
  color: ${({ $closed }) => ($closed ? Color.mono[600] : Color.green[500])};
  display: flex;
  font-weight: bold;
  gap: ${Space * 2}px;
  justify-content: left;
  padding: ${Space * 1}px ${Space * 2}px;
`;

export const Odds = ({ data }) => {
  const { raceId } = useRouter().query;
  const [oddsKeyToBuy, setOddsKeyToBuy] = useState(null);
  const modalRef = useRef(null);
  const { data: oddsData } = useFetch(`/api/races/${raceId}/odds`, jsonFetcher);

  const handleClickOdds = useCallback(
    /**
     * @param {Model.OddsItem} odds
     */
    (odds) => {
      setOddsKeyToBuy(odds.key);
      modalRef.current?.showModal();
    },
    []
  );

  const isRaceClosed = isBefore(data.closeAt, new Date());

  return (
    <>
      <main>
        <Container>
          <Spacer mt={Space * 2} />
          <Heading as="h1">{data.name}</Heading>
          <p>
            開始 {formatTime(data.startAt)} 締切 {formatTime(data.closeAt)}
          </p>

          <Spacer mt={Space * 2} />

          <Section dark shrink>
            <LiveBadge>Live</LiveBadge>
            <Spacer mt={Space * 2} />
            <TrimmedImage
              maxWidth={"calc(100vw - 32px)"}
              height={225}
              src={convertJpgToWebp(data.image)}
              width={400}
            />
          </Section>

          <Spacer mt={Space * 2} />

          {oddsData && (
            <Section>
              <TabNav>
                <TabNav.Item to={`/races/${raceId}/race-card`}>
                  出走表
                </TabNav.Item>
                <TabNav.Item aria-current to={`/races/${raceId}/odds`}>
                  オッズ
                </TabNav.Item>
                <TabNav.Item to={`/races/${raceId}/result`}>結果</TabNav.Item>
              </TabNav>

              <Spacer mt={Space * 4} />

              <Callout $closed={isRaceClosed}>
                {/* <i className="fas fa-info-circle" /> */}
                <InfoCircle />
                {isRaceClosed
                  ? "このレースの投票は締め切られています"
                  : "オッズをクリックすると拳券が購入できます"}
              </Callout>

              <Spacer mt={Space * 4} />
              <Heading as="h2">オッズ表</Heading>

              <Spacer mt={Space * 2} />
              <OddsTable
                entries={data.entries}
                isRaceClosed={isRaceClosed}
                odds={oddsData.trifectaOdds}
                onClickOdds={handleClickOdds}
              />

              <Spacer mt={Space * 4} />
              <Heading as="h2">人気順</Heading>

              <Spacer mt={Space * 2} />
              <OddsRankingList
                isRaceClosed={isRaceClosed}
                odds={oddsData.trifectaOdds}
                onClickOdds={handleClickOdds}
              />
            </Section>
          )}

          <TicketVendingModal
            ref={modalRef}
            odds={oddsKeyToBuy}
            raceId={raceId}
          />
        </Container>
      </main>
      {oddsData && <Footer />}
    </>
  );
};
