"use client";

import dynamic from "next/dynamic";
import React, { Suspense, useCallback, useState } from "react";

import { Container } from "../../components/layouts/Container";
import { Spacer } from "../../components/layouts/Spacer";
import { Stack } from "../../components/layouts/Stack";
import { useAuthorizedFetch } from "../../hooks/useAuthorizedFetch";
import { Space } from "../../styles/variables";
import { authorizedJsonFetcher } from "../../utils/HttpUtils";

import styles from "./Top.module.css";

import ChargeDialog from "./internal/ChargeDialog/ChargeDialog";

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
    <Container>
      {userData && (
        <Stack horizontal alignItems="center" justifyContent="space-between">
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
        <ChargeDialog onComplete={handleCompleteCharge} onClose={close} />
      )}
    </Container>
  );
};
