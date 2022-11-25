"use client";

import React, { Suspense, useCallback, useState } from "react";

import { Container } from "../../components/layouts/Container";
import { Spacer } from "../../components/layouts/Spacer";
import { Stack } from "../../components/layouts/Stack";
import { Heading } from "../../components/typographies/Heading";
import { useAuthorizedFetch } from "../../hooks/useAuthorizedFetch";
import { Space } from "../../styles/variables";
import { authorizedJsonFetcher } from "../../utils/HttpUtils";
import { TrimmedImage } from "../../components/media/TrimmedImage";
import { isSameDay } from "../../utils/DateUtils";

import { RecentRaceList } from "./internal/RecentRaceList";
import ChargeDialog from "./internal/ChargeDialog/ChargeDialog";

import styles from "./Top.module.css";

/** @type {React.VFC} */
export const Top = ({ raceData, date: _date  }) => {
  const date = _date ? new Date(_date) : new Date();
  const todayRaces =
    raceData != null
      ? raceData.races
          .sort(
            (a, b) =>
              new Date(a.startAt).getTime - new Date(b.startAt).getTime()
          )
          .filter((race) => isSameDay(race.startAt, date))
      : [];

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

  return (
    <>
      <main>
        <Container>
          <TrimmedImage
            width={1024}
            height={735}
            maxWidth={"100%"}
            priorityClass="main"
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

              <button
                className={styles.chargeButton}
                onClick={handleClickChargeButton}
              >
                チャージ
              </button>
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
            <Suspense fallback={null}>
              <ChargeDialog onComplete={handleCompleteCharge} onClose={close} />
            </Suspense>
          )}
        </Container>
      </main>
    </>
  );
};
