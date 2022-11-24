import React from "react";
import styles from "./OddsMaker.module.css";

/**
 * @typedef Props
 * @property {number} odds
 */

/** @type {React.FC<Props>} */
export const OddsMarker = ({ odds }) => {
  return (
    <span
      className={styles.wrapper}
      style={{ background: `rgba(74, 222, 128, ${Math.min(5 / odds, 1.0)})` }}
    >
      {odds.toFixed(1)}
    </span>
  );
};
