import React, { useCallback, useState } from "react";
import styled from "styled-components";

import { Container } from "../../components/layouts/Container";
import { Spacer } from "../../components/layouts/Spacer";
import { Stack } from "../../components/layouts/Stack";
import { Footer } from "../../components/navs/Footer";
import { Heading } from "../../components/typographies/Heading";
import { useAuthorizedFetch } from "../../hooks/useAuthorizedFetch";
import { Color, Radius, Space } from "../../styles/variables";
import { isSameDay } from "../../utils/DateUtils";
import { authorizedJsonFetcher } from "../../utils/HttpUtils";

import { TrimmedImage } from "../../components/media/TrimmedImage";
import { RecentRaceList } from "./internal/RecentRaceList";

import ChargeDialog from "./internal/ChargeDialog/ChargeDialog";

const getYYYYMMDD = (d) => {
  const date = new Date(d);
  const yyyy = `${date.getFullYear()}`.padStart(4, "0");
  const mm = `${date.getMonth() + 1}`.padStart(2, "0");
  const dd = `${date.getDate()}`.padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

/** @type {React.VFC} */
export const Top = ({ raceData, date: _date }) => {
  const date = _date || getYYYYMMDD(new Date());
  const [open, setOpen] = useState(false);

  const { data: userData, revalidate } = useAuthorizedFetch(
    "/api/users/me",
    authorizedJsonFetcher
  );

  const handleClickChargeButton = useCallback(() => {
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  const handleCompleteCharge = useCallback(() => {
    revalidate();
  }, [revalidate]);

  const todayRaces =
    raceData != null
      ? [...raceData.races]
          .sort(
            (/** @type {Model.Race} */ a, /** @type {Model.Race} */ b) =>
              new Date(a.startAt).getTime - new Date(b.startAt).getTime()
          )
          .filter((/** @type {Model.Race} */ race) =>
            isSameDay(race.startAt, date)
          )
      : [];

  return (
    <>
      <main>
        <Container>
          <TrimmedImage
            width={1024}
            height={735}
            maxWidth={"100%"}
            src={"/assets/images/hero.webp"}
          />
          <Spacer mt={Space * 2} />
          {userData && (
            <Stack
              horizontal
              alignItems="center"
              justifyContent="space-between"
            >
              <div>
                <p>ポイント残高: {userData.balance}pt</p>
                <p>払戻金: {userData.payoff}Yeen</p>
              </div>

              <ChargeButton onClick={handleClickChargeButton}>
                チャージ
              </ChargeButton>
            </Stack>
          )}
          <Spacer mt={Space * 2} />
          <section>
            <Heading as="h1">本日のレース</Heading>
            {todayRaces.length > 0 && (
              <RecentRaceList>
                {todayRaces.map((race, index) => (
                  <RecentRaceList.Item
                    key={race.id}
                    race={race}
                    index={index}
                  />
                ))}
              </RecentRaceList>
            )}
          </section>
          {open && (
            <ChargeDialog onComplete={handleCompleteCharge} onClose={close} />
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
};

const ChargeButton = styled.button`
  background: ${Color.mono[700]};
  border-radius: ${Radius.MEDIUM};
  color: ${Color.mono[0]};
  padding: ${Space * 1}px ${Space * 2}px;

  &:hover {
    background: ${Color.mono[800]};
  }
`;
