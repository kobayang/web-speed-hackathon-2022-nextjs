import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import { Container } from "../../../components/layouts/Container";
import { Section } from "../../../components/layouts/Section";
import { Spacer } from "../../../components/layouts/Spacer";
import { TrimmedImage } from "../../../components/media/TrimmedImage";
import { Footer } from "../../../components/navs/Footer";
import { TabNav } from "../../../components/navs/TabNav";
import { Heading } from "../../../components/typographies/Heading";
import { useFetch } from "../../../hooks/useFetch";
import { Color, Radius, Space } from "../../../styles/variables";
import { formatTime } from "../../../utils/DateUtils";
import { jsonFetcher } from "../../../utils/HttpUtils";
import { convertJpgToWebp } from "../../../utils/convertJpgToWebp";

import { EntryTable } from "./internal/EntryTable";
import { PlayerPictureList } from "./internal/PlayerPictureList";

const LiveBadge = styled.span`
  background: ${Color.red};
  border-radius: ${Radius.SMALL};
  color: ${Color.mono[0]};
  font-weight: bold;
  padding: ${Space * 1}px;
  text-transform: uppercase;
`;

/** @type {React.VFC} */
export const RaceCard = () => {
  const { raceId } = useRouter().query;
  const { data } = useFetch(`/api/races/${raceId}`, jsonFetcher);

  if (data == null) {
    return (
      <main>
        <Container>Loading...</Container>
      </main>
    );
  }

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
              calc={true}
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
          </Section>
        </Container>
      </main>
      <Footer />
    </>
  );
};