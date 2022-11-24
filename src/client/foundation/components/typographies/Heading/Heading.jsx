import React from "react";
import styled from "styled-components";
import styles from "./Heading.module.css";

import { FontSize } from "../../../styles/variables";

const fontSizes = {
  h1: `2rem`,
  h2: `${FontSize.X_LARGE}`,
  h3: `1.25rem`,
};

/**
 * @typedef Props
 * @property {'h1' | 'h2' | 'h3'} as
 */

/** @type {React.FC<Props>} */
export const Heading = ({ as = "h1", children }) => {
  const As = as;
  return (
    <As className={styles.wrapper} style={{ fontSize: fontSizes[as] }}>
      {children}
    </As>
  );
};
