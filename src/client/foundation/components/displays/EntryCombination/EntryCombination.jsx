import React from "react";
import styles from "./EntryCombination.module.css";

/**
 * @typedef Props
 * @property {number[]} numbers
 */

/** @type {React.VFC<Props>} */
export const EntryCombination = ({ numbers }) => {
  return (
    <div className={styles.wrapper}>
      {numbers.map((key, j) => (
        <div className={styles.inner} key={j}>
          {key}
        </div>
      ))}
    </div>
  );
};
