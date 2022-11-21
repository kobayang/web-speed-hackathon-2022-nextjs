import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export const useImageSize = ({ calc, height: initialHeight, width }) => {
  const ref = useRef(null);
  const [height, setHeight] = useState(calc ? undefined : initialHeight);

  useEffect(() => {
    if (!calc) return;
    const imgElm = ref.current;
    if (!imgElm) return;
    const rectWidth = imgElm.getBoundingClientRect().width;
    setHeight(initialHeight * (rectWidth / width));
  }, [initialHeight, width, calc]);

  return {
    height,
    ref,
    width,
  };
};

/**
 * アスペクト比を維持したまま、要素のコンテンツボックス全体を埋めるように拡大縮小したサイズを返す
 */

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
        <Img src={src} alt="" fill />
      </Wrapper>
    );
  }
  return <Img src={src} width={width} height={height} />;
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
