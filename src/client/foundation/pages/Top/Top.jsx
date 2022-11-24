"use client";

import React, { useCallback, useState } from "react";

import { Container } from "../../components/layouts/Container";
import { Spacer } from "../../components/layouts/Spacer";
import { Stack } from "../../components/layouts/Stack";
import { Footer } from "../../components/navs/Footer";
import { Heading } from "../../components/typographies/Heading";
import { useAuthorizedFetch } from "../../hooks/useAuthorizedFetch";
import { Space } from "../../styles/variables";
import { isSameDay } from "../../utils/DateUtils";
import { authorizedJsonFetcher } from "../../utils/HttpUtils";

import { TrimmedImage } from "../../components/media/TrimmedImage";
import { RecentRaceList } from "./internal/RecentRaceList";

import ChargeDialog from "./internal/ChargeDialog/ChargeDialog";

import styles from "./Top.module.css";

const getYYYYMMDD = (d) => {
  const date = new Date(d);
  const yyyy = `${date.getFullYear()}`.padStart(4, "0");
  const mm = `${date.getMonth() + 1}`.padStart(2, "0");
  const dd = `${date.getDate()}`.padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

/** @type {React.VFC} */
export const Top = ({ todayRaces }) => {
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
            <ChargeDialog onComplete={handleCompleteCharge} onClose={close} />
          )}
        </Container>
      </main>
    </>
  );
};
