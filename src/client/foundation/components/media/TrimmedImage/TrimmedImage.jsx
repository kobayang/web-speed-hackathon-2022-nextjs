import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
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
        <Img src={src} alt="" fill loading="lazy" />
      </Wrapper>
    );
  }
  return <Img src={src} width={width} height={height} loading="lazy" />;
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
