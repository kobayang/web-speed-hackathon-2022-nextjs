import React, { forwardRef } from "react";
import styles from "./Dialog.module.css";

/**
 * @typedef Props
 * @type {object}
 * @property {Function} onClose
 */

/** @type {React.ForwardRefExoticComponent<{Props>} */
export const Dialog = forwardRef(({ children, onClose }, ref) => {
  return (
    <dialog className={styles.dialog} ref={ref} onClose={onClose}>
      {children}
    </dialog>
  );
});

Dialog.displayName = "Dialog";
