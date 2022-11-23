import Image from "next/image";
import React from "react";
import styled from "styled-components";

/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {number} height
 */

/** @type {React.VFC<Props>} */
export const TrimmedImage = ({ maxWidth, height, src, width }) => {
  if (maxWidth) {
    return (
      <Wrapper $paddingTop={(height / width) * 100} style={{ maxWidth, width }}>
        <Img
          quality={10}
          src={src}
          alt=""
          fill
          loading="lazy"
          priority={true}
        />
      </Wrapper>
    );
  }
  return (
    <Img
      src={src}
      width={width}
      height={height}
      alt=""
      loading="lazy"
      quality={10}
    />
  );
};

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  &:before {
    content: "";
    display: block;
    padding-top: ${(p) => p.$paddingTop}%;
  }
`;

const Img = styled(Image)`
  object-fit: cover;
`;
