import Image from "next/image";
import React from "react";
import classnames from "classnames";

import styles from "./TrimmedImage.module.css";

/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {number} height
 */

/** @type {React.VFC<Props>} */
export const TrimmedImage = ({
  maxWidth,
  height,
  src,
  width,
  priorityClass,
}) => {
  if (maxWidth) {
    return (
      <div
        className={classnames(styles.wrapper, {
          [styles.main]: priorityClass === "main",
          [styles.race]: priorityClass === "sub",
        })}
        style={{ maxWidth, width }}
      >
        <Image
          quality={2}
          src={src}
          alt=""
          fill
          priority={true}
          className={styles.img}
        />
      </div>
    );
  }
  return (
    <Image
      src={src}
      style={{
        objectFit: "cover",
      }}
      width={width}
      height={height}
      alt=""
      loading="lazy"
      quality={2}
    />
  );
};
