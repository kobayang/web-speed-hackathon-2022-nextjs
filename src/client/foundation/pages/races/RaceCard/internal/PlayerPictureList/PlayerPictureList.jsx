import React from "react";
import styles from "./PlayerPictureList.module.css";

import { Stack } from "../../../../../components/layouts/Stack";
import { TrimmedImage } from "../../../../../components/media/TrimmedImage";
import { Space } from "../../../../../styles/variables";

/**
 * @typedef ItemProps
 * @property {number} number
 * @property {string} image
 * @property {string} name
 */

/** @type {React.VFC<ItemProps>} */
const Item = ({ image, name, number }) => {
  return (
    <Stack gap={Space * 1}>
      <TrimmedImage
        alt={`${name}選手のプロフィール写真`}
        height={100}
        src={image}
        width={100}
      />

      <Stack horizontal alignItems="center" gap={Space / 2} wrap="wrap">
        <span className={styles.playerNumber}>{number}</span>
        <span className={styles.playerName}>{name}</span>
      </Stack>
    </Stack>
  );
};

export const PlayerPictureList = ({ children }) => {
  return (
    <Stack horizontal gap={Space * 2} wrap="wrap">
      {children}
    </Stack>
  );
};
PlayerPictureList.Item = Item;
