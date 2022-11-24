"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

import { Spacer } from "../../../../components/layouts/Spacer";
import { Stack } from "../../../../components/layouts/Stack";
import { TrimmedImage } from "../../../../components/media/TrimmedImage";
import { Space } from "../../../../styles/variables";
import { convertJpgToWebp } from "../../../../utils/convertJpgToWebp";
import { formatCloseAt } from "../../../../utils/DateUtils";

import styles from "./RecentRaceList.module.css";

export const RecentRaceList = ({ children }) => {
  return (
    <Stack as="ul" gap={Space * 2}>
      {children}
    </Stack>
  );
};

/**
 * @typedef ItemProps
 * @property {Model.Race} race
 */

/** @type {React.VFC<ItemProps>} */
const Item = ({ race, index }) => {
  const [closeAtText, setCloseAtText] = useState(formatCloseAt(race.closeAt));

  // 締切はリアルタイムで表示したい
  useEffect(() => {
    const timer = setInterval(() => {
      setCloseAtText(formatCloseAt(race.closeAt));
    }, 0);

    return () => {
      clearInterval(timer);
    };
  }, [race.closeAt]);

  return (
    <li
      className={styles.itemWrapper}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Stack horizontal alignItems="center" justifyContent="space-between">
        <Stack gap={Space * 1}>
          <h2 className={styles.raceTitle}>{race.name}</h2>
          <p>{closeAtText}</p>
        </Stack>

        <Spacer mr={Space * 2} />

        <Stack.Item grow={0} shrink={0}>
          <Stack horizontal alignItems="center" gap={Space * 2}>
            <TrimmedImage
              height={100}
              src={convertJpgToWebp(race.image)}
              width={100}
            />
            <Link
              className={styles.raceButton}
              href={`/races/${race.id}/race-card`}
            >
              投票
            </Link>
          </Stack>
        </Stack.Item>
      </Stack>
    </li>
  );
};
RecentRaceList.Item = React.memo(Item);
