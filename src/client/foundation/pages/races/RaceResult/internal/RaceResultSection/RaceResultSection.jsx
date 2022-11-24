import React from "react";

import { HandPeace } from "../../../../../components/icons/Icon";
import styles from "./RaceResultSection.module.css";

/**
 * @typedef Props
 */

/** @type {React.VFC<Props>} */
export const RaceResultSection = () => {
  return (
    <div className={styles.wrapper}>
      {/* <i className="far fa-hand-peace" /> */}
      <HandPeace />
      <div>結果はまだありません</div>
    </div>
  );
};
