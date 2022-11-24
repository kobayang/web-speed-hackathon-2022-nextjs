import React from "react";
import styles from "./Heading.module.css";

import { FontSize } from "../../../styles/variables";

/**
 * @typedef Props
 * @property {'h1' | 'h2' | 'h3'} as
 */

/** @type {React.FC<Props>} */
export const Heading = ({ as = "h1", children }) => {
  const As = as;
  return <As className={styles.wrapper}>{children}</As>;
};
