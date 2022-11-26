"use client";

import dynamic from "next/dynamic";
import React, { Suspense, useCallback, useState } from "react";

import { Container } from "../../components/layouts/Container";
import { Spacer } from "../../components/layouts/Spacer";
import { Stack } from "../../components/layouts/Stack";
import { TrimmedImage } from "../../components/media/TrimmedImage";
import { useAuthorizedFetch } from "../../hooks/useAuthorizedFetch";
import { Space } from "../../styles/variables";
import { authorizedJsonFetcher } from "../../utils/HttpUtils";

import styles from "./Top.module.css";

const ChargeDialog = dynamic(
  () => import("./internal/ChargeDialog/ChargeDialog"),
  { suspense: true }
);

/** @type {React.VFC} */
export const Top = ({ children }) => {
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
          {children}
          {open && (
            <Suspense>
              <ChargeDialog onComplete={handleCompleteCharge} onClose={close} />
            </Suspense>
          )}
        </Container>
      </main>
    </>
  );
};
