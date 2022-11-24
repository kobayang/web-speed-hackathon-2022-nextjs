import React from "react";
import styles from "./Container.module.css";

/** @type {React.FC} */
export const Container = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};
