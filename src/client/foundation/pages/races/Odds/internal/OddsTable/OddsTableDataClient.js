"use client";

import { range, without } from "lodash-es";
import { mapKey } from "./mapkey";
import { OddsTableData } from "./OddsTableData";

export const ODdsTableDataClient = ({
  entries,
  odds,
  isRaceClosed,
  firstKey,
}) => {
  const headNumbers = without(range(1, entries.length + 1), firstKey);

  const oddsMap = odds
    .filter((item) => item.key[0] === firstKey)
    .reduce((acc, cur) => {
      const [, second, third] = cur.key;
      acc[mapKey(second, third)] = cur;
      return acc;
    }, {});

  return (
    <OddsTableData
      headNumbers={headNumbers}
      oddsMap={oddsMap}
      isRaceClosed={isRaceClosed}
    />
  );
};
