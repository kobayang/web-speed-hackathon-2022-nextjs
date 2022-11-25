import Link from "next/link";
import React from "react";

import { Spacer } from "../../../../components/layouts/Spacer";
import { Stack } from "../../../../components/layouts/Stack";
import { TrimmedImage } from "../../../../components/media/TrimmedImage";
import { Space } from "../../../../styles/variables";
import { convertJpgToWebp } from "../../../../utils/convertJpgToWebp";
import { CloseAtText } from "./CloseAtText";

import styles from "./RecentRaceList.module.css";

/**
 * @typedef ItemProps
 * @property {Model.Race} race
 */

/** @type {React.VFC<ItemProps>} */
export const RecentRaceListItem = ({ race, index }) => {
  return (
    <li
      className={styles.itemWrapper}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Stack horizontal alignItems="center" justifyContent="space-between">
        <Stack gap={Space * 1}>
          <h2 className={styles.raceTitle}>{race.name}</h2>
          <CloseAtText closeAt={race.closeAt} />
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

