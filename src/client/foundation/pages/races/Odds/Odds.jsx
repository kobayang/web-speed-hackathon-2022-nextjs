"use client";

import React, { createContext, useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";
import classnames from "classnames";
import styles from "./Odds.module.css";

import { InfoCircle } from "../../../components/icons/Icon";
import { Container } from "../../../components/layouts/Container";
import { Section } from "../../../components/layouts/Section";
import { Spacer } from "../../../components/layouts/Spacer";
import { TrimmedImage } from "../../../components/media/TrimmedImage";
import { TabNav } from "../../../components/navs/TabNav";
import { Heading } from "../../../components/typographies/Heading";
import { useFetch } from "../../../hooks/useFetch";
import { Space } from "../../../styles/variables";
import { formatTime, isBefore } from "../../../utils/DateUtils";
import { jsonFetcher } from "../../../utils/HttpUtils";
import { convertJpgToWebp } from "../../../utils/convertJpgToWebp";

import { OddsRankingList } from "./internal/OddsRankingList";
import { OddsTable } from "./internal/OddsTable";
import { TicketVendingModal } from "./internal/TicketVendingModal";
import { OddsModalProvider } from "./useOddsModalContext";

export const Odds = ({ data, raceId, isRaceClosed }) => {
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

  return (
    <OddsModalProvider value={handleClickOdds}>
      <main>
        <Container>
          <Spacer mt={Space * 2} />
          <Heading as="h1">{data.name}</Heading>
          <p>
            開始 {formatTime(data.startAt)} 締切 {formatTime(data.closeAt)}
          </p>
          <Spacer mt={Space * 2} />
          <Section dark shrink>
            <span className={styles.liveBadge}>Live</span>
            <Spacer mt={Space * 2} />
            <TrimmedImage
              maxWidth={"calc(100vw - 32px)"}
              priorityClass="race"
              height={225}
              src={convertJpgToWebp(data.image)}
              width={400}
            />
          </Section>
          <Spacer mt={Space * 2} />
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

            <aside
              className={classnames(
                styles.callOut,
                isRaceClosed ? styles.closed : styles.noClosed
              )}
            >
              {/* <i className="fas fa-info-circle" /> */}
              <InfoCircle />
              {isRaceClosed
                ? "このレースの投票は締め切られています"
                : "オッズをクリックすると拳券が購入できます"}
            </aside>

            <Spacer mt={Space * 4} />
            <Heading as="h2">オッズ表</Heading>

            <Spacer mt={Space * 2} />

            {oddsData && (
              <>
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
              </>
            )}
          </Section>
          <TicketVendingModal
            ref={modalRef}
            odds={oddsKeyToBuy}
            raceId={raceId}
          />
        </Container>
      </main>
    </OddsModalProvider>
  );
};
