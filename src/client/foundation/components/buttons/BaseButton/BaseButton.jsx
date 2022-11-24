import React from "react";
import styles from "./BaseButton.module.css";

/**
 * @typedef Props
 * @property {string=} className
 */

/** @type {React.FC<Props & React.ButtonHTMLAttributes>} */
export const BaseButton = (props) => {
  return <button className={styles.BaseButton} {...props} />;
};
