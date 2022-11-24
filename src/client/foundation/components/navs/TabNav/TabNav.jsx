import Link from "next/link";
import React from "react";
import styles from "./TabNav.module.css";

import { Stack } from "../../layouts/Stack";

/**
 * @typedef ItemProps
 * @property {string} to
 */

/** @type {React.FC<ItemProps & React.AnchorHTMLAttributes>} */
const Item = ({ "aria-current": ariaCurrent, children, to, ...rest }) => {
  return (
    <li>
      {ariaCurrent ? (
        <a className={styles.anchor} aria-current {...rest}>
          {children}
        </a>
      ) : (
        <Link
          className={styles.anchor}
          prefetch={false}
          aria-current={ariaCurrent}
          href={to}
          {...rest}
        >
          {children}
        </Link>
      )}
    </li>
  );
};

export const TabNav = ({ children }) => {
  return (
    <nav>
      <Stack horizontal as="ul" gap={16}>
        {children}
      </Stack>
    </nav>
  );
};
TabNav.Item = Item;
