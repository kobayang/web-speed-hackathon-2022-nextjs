import React from "react";

import { EntryCombination } from "../../../../../components/displays/EntryCombination";
import { TicketAlt } from "../../../../../components/icons/Icon";

import styles from "./BettingTicketList.module.css";

const Cell = ({ as = "td", $align, ...props }) => {
  const As = as;
  return (
    <As
      className={clasnames(styles.cell, props.className)}
      style={{ textAlign: $align }}
      {...props}
    />
  );
};

/**
 * @typedef ItemProps
 * @property {Model.BettingTicket} ticket
 */

/** @type {React.VFC<ItemProps>} */
const Item = ({ ticket: { key } }) => {
  return (
    <tr className={styles.itemWrapper}>
      <Cell>-</Cell>
      <Cell>
        <EntryCombination numbers={key} />
      </Cell>
      <Cell $align="right">100pt</Cell>
    </tr>
  );
};

export const BettingTicketList = ({ children }) => {
  if (React.Children.count(children) === 0) {
    return (
      <div className={styles.placeholder}>
        {/* <i className="fas fa-ticket-alt" /> */}
        <TicketAlt />
        <div>購入した拳券はありません</div>
      </div>
    );
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <Cell clasnames={styles.headerTh} as="th">
            的中
          </Cell>
          <Cell clasnames={styles.headerTh} as="th">
            買い目
          </Cell>
          <Cell clasnames={styles.headerTh} $align="right" as="th" width="96px">
            数量
          </Cell>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};
BettingTicketList.Item = Item;
