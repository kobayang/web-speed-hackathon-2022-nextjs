import React from "react";

import { Container } from "../../../components/layouts/Container";
import { Section } from "../../../components/layouts/Section";
import { Spacer } from "../../../components/layouts/Spacer";
import { TrimmedImage } from "../../../components/media/TrimmedImage";
import { TabNav } from "../../../components/navs/TabNav";
import { Heading } from "../../../components/typographies/Heading";
import { Space } from "../../../styles/variables";
import { convertJpgToWebp } from "../../../utils/convertJpgToWebp";
import { formatTime } from "../../../utils/DateUtils";
import { EntryTable } from "./internal/EntryTable";
import { PlayerPictureList } from "./internal/PlayerPictureList";

import styles from "./RaceCard.module.css";

/** @type {React.VFC} */
export const RaceCard = ({ data, raceId }) => {
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
              <TabNav.Item aria-current to={`/races/${raceId}/race-card`}>
                出走表
              </TabNav.Item>
              <TabNav.Item to={`/races/${raceId}/odds`}>オッズ</TabNav.Item>
              <TabNav.Item to={`/races/${raceId}/result`}>結果</TabNav.Item>
            </TabNav>
            <Spacer mt={Space * 2} />
            <PlayerPictureList>
              {data.entries.map((entry) => (
                <PlayerPictureList.Item
                  key={entry.id}
                  image={convertJpgToWebp(entry.player.image)}
                  name={entry.player.name}
                  number={entry.number}
                />
              ))}
            </PlayerPictureList>
            <Spacer mt={Space * 4} />
            <EntryTable entries={data.entries} />
            <Spacer mt={Space * 4} />
          </Section>
        </Container>
      </main>
    </>
  );
};
