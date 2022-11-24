import React from "react";
import classnames from "classnames";
import styles from "./EntryTable.module.css";

const TableHCell = ({ $bold, $align, ...props }) => {
  return (
    <th
      className={classnames(styles.th, styles.theadth)}
      {...props}
      style={{ fontWeight: $bold ? "bold" : undefined, textAlign: $align }}
    />
  );
};

const TableCell = ({ $bold, $align, ...props }) => {
  return (
    <td
      className={classnames(styles.td)}
      {...props}
      style={{ fontWeight: $bold ? "bold" : undefined, textAlign: $align }}
    />
  );
};

/**
 * @typedef Props
 * @property {Model.RaceEntry[]} entries
 */

/** @type {React.VFC<Props>} */
export const EntryTable = ({ entries }) => {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr className={classnames(styles.theadtr)}>
            <TableHCell rowSpan={2} width="48px">
              番号
            </TableHCell>
            <TableHCell $align="left" rowSpan={2}>
              選手名
            </TableHCell>
            <TableHCell rowSpan={2} width="48px">
              予想
            </TableHCell>
            <TableHCell colSpan={3}>決まり手</TableHCell>

            <TableHCell rowSpan={2} width="24px">
              1位
            </TableHCell>
            <TableHCell rowSpan={2} width="24px">
              2位
            </TableHCell>
            <TableHCell rowSpan={2} width="24px">
              3位
            </TableHCell>
            <TableHCell rowSpan={2} width="24px">
              着外
            </TableHCell>

            <TableHCell rowSpan={2} width="80px">
              勝率
            </TableHCell>
            <TableHCell rowSpan={2} width="80px">
              3位内率
            </TableHCell>

            <TableHCell $align="left" rowSpan={2} width="250px">
              コメント
            </TableHCell>
          </tr>
          <tr className={styles.theadtr}>
            <TableHCell width="64px">グー</TableHCell>
            <TableHCell width="64px">チョキ</TableHCell>
            <TableHCell width="64px">パー</TableHCell>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <TableCell>{entry.number}</TableCell>
              <TableCell $bold $align="left">
                {entry.player.name}
              </TableCell>
              <TableCell>{entry.predictionMark}</TableCell>

              <TableCell>{entry.rockWin}</TableCell>
              <TableCell>{entry.scissorsWin}</TableCell>
              <TableCell>{entry.paperWin}</TableCell>

              <TableCell>{entry.first}</TableCell>
              <TableCell>{entry.second}</TableCell>
              <TableCell>{entry.third}</TableCell>
              <TableCell>{entry.others}</TableCell>

              <TableCell>{entry.firstRate.toFixed(1)}</TableCell>
              <TableCell>{entry.thirdRate.toFixed(1)}</TableCell>

              <TableCell $align="left">{entry.comment}</TableCell>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
