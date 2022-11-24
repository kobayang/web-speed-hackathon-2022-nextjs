import sortBy from "lodash-es/sortBy";
import take from "lodash-es/take";
import React from "react";
import styles from "./OddsRankingList.module.css";

import { EntryCombination } from "../../../../../components/displays/EntryCombination";
import { Stack } from "../../../../../components/layouts/Stack";
import { OddsMarker } from "../OddsMarker";

/**
 * @typedef Props
 * @property {Model.OddsItem[]} odds
 * @property {boolean} isRaceClosed
 * @property {(odds: Model.OddsItem) => void} onClickOdds
 */

/** @type {React.VFC<Props>} */
export const OddsRankingList = ({ isRaceClosed, odds, onClickOdds }) => {
  const sortedOdds = take(
    sortBy(odds, (item) => item.odds),
    50
  );

  return (
    <ol className={styles.wrapper}>
      {sortedOdds.map((item, i) => (
        <li className={styles.li} key={item.id}>
          {isRaceClosed ? (
            <div className={styles.inactiveButton}>
              <Stack horizontal alignItems="center" gap={16}>
                <div className={styles.rankNo}>{i + 1}.</div>
                <EntryCombination numbers={item.key} />
                <OddsMarker as="div" odds={item.odds} />
              </Stack>
            </div>
          ) : (
            <button
              className={styles.buyButton}
              onClick={() => onClickOdds(item)}
            >
              <Stack horizontal alignItems="center" gap={16}>
                <div className={styles.rankNo}>{i + 1}.</div>
                <EntryCombination numbers={item.key} />
                <OddsMarker as="div" odds={item.odds} />
              </Stack>
            </button>
          )}
        </li>
      ))}
    </ol>
  );
};
