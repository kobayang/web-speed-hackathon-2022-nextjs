"use client";

import range from "lodash-es/range";
import without from "lodash-es/without";
import React, { useCallback, useState } from "react";
import styles from "./OddsTable.module.css";

import { Spacer } from "../../../../../components/layouts/Spacer";
import { Stack } from "../../../../../components/layouts/Stack";
import { Space } from "../../../../../styles/variables";
import { OddsMarker } from "../OddsMarker";
import { BuyButton } from "./BuyButton";
import { ODdsTableDataClient } from "./OddsTableDataClient";

/**
 * @typedef Props
 * @property {Model.OddsItem[]} odds
 * @property {Model.RaceEntry[]} entries
 * @property {boolean} isRaceClosed
 */

/** @type {React.VFC<Props>} */
export function OddsTable({ entries, isRaceClosed, odds, children }) {
  const [firstKey, setFirstKey] = useState(1);

  const handleChange = useCallback((e) => {
    setFirstKey(parseInt(e.currentTarget.value, 10));
  }, []);

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

      {firstKey === 1 ? (
        children
      ) : (
        <ODdsTableDataClient
          entries={entries}
          odds={odds}
          isRaceClosed={isRaceClosed}
          firstKey={firstKey}
        />
      )}
    </div>
  );
}
