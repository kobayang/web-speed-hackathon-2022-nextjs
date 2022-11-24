"use client";

import range from "lodash-es/range";
import without from "lodash-es/without";
import React, { useCallback, useState } from "react";
import styles from "./OddsTable.module.css";

import { Spacer } from "../../../../../components/layouts/Spacer";
import { Stack } from "../../../../../components/layouts/Stack";
import { Space } from "../../../../../styles/variables";
import { OddsMarker } from "../OddsMarker";

/**
 * @param {number} second
 * @param {number} third
 * @returns {string}
 */
const mapKey = (second, third) => `${second}.${third}`;

/**
 * @typedef Props
 * @property {Model.OddsItem[]} odds
 * @property {Model.RaceEntry[]} entries
 * @property {boolean} isRaceClosed
 * @property {(odds: Model.OddsItem) => void} onClickOdds
 */

/** @type {React.VFC<Props>} */
export const OddsTable = ({ entries, isRaceClosed, odds, onClickOdds }) => {
  const [firstKey, setFirstKey] = useState(1);

  const handleChange = useCallback((e) => {
    setFirstKey(parseInt(e.currentTarget.value, 10));
  }, []);

  const headNumbers = without(range(1, entries.length + 1), firstKey);

  const filteredOdds = odds.filter((item) => item.key[0] === firstKey);
  const oddsMap = filteredOdds.reduce((acc, cur) => {
    const [, second, third] = cur.key;
    acc[mapKey(second, third)] = cur;
    return acc;
  }, {});

  return (
    <div>
      <Stack horizontal>
        <label className={styles.rankLabel}>1位軸</label>
        <select onChange={handleChange} value={firstKey}>
          {entries.map((entry) => (
            <option key={entry.id} value={entry.number}>
              {entry.number}. {entry.player.name}
            </option>
          ))}
        </select>
      </Stack>

      <Spacer mt={Space * 2} />
      <div className={styles.scrollWrapper}>
        <div>
          <table className={styles.table}>
            <thead className={styles.th}>
              <tr>
                <th className={styles.th} width="64px">
                  2位
                </th>
                <th className={styles.th} width="32px"></th>

                {headNumbers.map((second) => (
                  <th className={styles.th} key={second} width="auto">
                    {second}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {headNumbers.map((third, i) => (
                <tr key={third}>
                  {i === 0 && (
                    <th className={styles.th} rowSpan={headNumbers.length}>
                      3位
                    </th>
                  )}

                  <th className={styles.th}>{third}</th>

                  {headNumbers.map((second) => {
                    const item = oddsMap[mapKey(second, third)];

                    return (
                      <td className={styles.td} key={second} width="auto">
                        {second !== third ? (
                          isRaceClosed ? (
                            <div className={styles.inactiveBaseButton}>
                              <OddsMarker odds={item.odds} />
                            </div>
                          ) : (
                            <button
                              className={styles.buyButton}
                              onClick={() => onClickOdds(item)}
                            >
                              <OddsMarker odds={item.odds} />
                            </button>
                          )
                        ) : (
                          <button className={styles.buyButton} disabled>
                            -
                          </button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
