"use client";

import React from "react";

import { Container } from "../../../components/layouts/Container";
import { Section } from "../../../components/layouts/Section";
import { Spacer } from "../../../components/layouts/Spacer";
import { TrimmedImage } from "../../../components/media/TrimmedImage";
import { TabNav } from "../../../components/navs/TabNav";
import { Heading } from "../../../components/typographies/Heading";
import { useAuthorizedFetch } from "../../../hooks/useAuthorizedFetch";
import { Space } from "../../../styles/variables";
import { convertJpgToWebp } from "../../../utils/convertJpgToWebp";
import { formatTime } from "../../../utils/DateUtils";
import { authorizedJsonFetcher } from "../../../utils/HttpUtils";

import { BettingTicketList } from "./internal/BettingTicketList";
import { RaceResultSection } from "./internal/RaceResultSection";

import styles from "./RaceResult.module.css";

/** @type {React.VFC} */
export const RaceResult = ({ data, raceId }) => {
  const { data: ticketData } = useAuthorizedFetch(
    `/api/races/${raceId}/betting-tickets`,
    authorizedJsonFetcher
  );

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
              <TabNav.Item to={`/races/${raceId}/odds`}>オッズ</TabNav.Item>
              <TabNav.Item aria-current to={`/races/${raceId}/result`}>
                結果
              </TabNav.Item>
            </TabNav>

            <Spacer mt={Space * 4} />
            <Heading as="h2">購入した買い目</Heading>

            <Spacer mt={Space * 2} />
            <BettingTicketList>
              {(ticketData?.bettingTickets ?? []).map((ticket) => (
                <BettingTicketList.Item key={ticket.id} ticket={ticket} />
              ))}
            </BettingTicketList>

            <Spacer mt={Space * 4} />
            <Heading as="h2">勝負結果</Heading>

            <Spacer mt={Space * 2} />
            <RaceResultSection />
          </Section>
        </Container>
      </main>
    </>
  );
};
