import React from "react";
import styles from "./Section.module.css";
import classnames from "classnames/bind";

const cx = classnames.bind(styles);

/**
 * @typedef Props
 * @property {boolean} dark
 * @property {boolean} shrink
 */

/** @type {React.FC<Props>} */
export const Section = ({ children, dark, shrink }) => {
  return (
    <section
      className={cx({
        wrapper: true,
        shrink,
        dark,
      })}
    >
      {children}
    </section>
  );
};
