"use client";

import { useOddsModalContext } from "../../useOddsModalContext";
import styles from "./OddsRankingList.module.css";

export function BuyButton({ item, children }) {
  const onClickOdds = useOddsModalContext();

  return (
    <button className={styles.buyButton} onClick={() => onClickOdds(item)}>
      {children}
    </button>
  );
}
