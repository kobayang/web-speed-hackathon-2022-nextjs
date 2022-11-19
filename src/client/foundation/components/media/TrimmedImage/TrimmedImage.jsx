import React, { useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";

export const useImageSize = ({ calc, height: initialHeight, width }) => {
  const ref = useRef(null);
  const [height, setHeight] = useState(calc ? undefined : initialHeight);

  useLayoutEffect(() => {
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
export const TrimmedImage = ({ calc, height: _height, src, width: _width }) => {
  const { height, ref, width } = useImageSize({
    calc,
    height: _height,
    src,
    width: _width,
  });
  return <Img ref={ref} src={src} style={{ height, width }} />;
};

const Img = styled.img`
  object-fit: cover;
  max-width: 100%;
`;
