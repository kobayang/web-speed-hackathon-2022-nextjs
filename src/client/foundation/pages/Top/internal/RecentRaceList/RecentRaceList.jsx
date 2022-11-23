import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";

import { LinkButton } from "../../../../components/buttons/LinkButton";
import { Spacer } from "../../../../components/layouts/Spacer";
import { Stack } from "../../../../components/layouts/Stack";
import { TrimmedImage } from "../../../../components/media/TrimmedImage";
import { Color, FontSize, Radius, Space } from "../../../../styles/variables";
import { formatCloseAt } from "../../../../utils/DateUtils";
import { convertJpgToWebp } from "../../../../utils/convertJpgToWebp";

export const RecentRaceList = ({ children }) => {
  return (
    <Stack as="ul" gap={Space * 2}>
      {children}
    </Stack>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ItemWrapper = styled.li`
  background: ${Color.mono[0]};
  border-radius: ${Radius.MEDIUM};
  opacity: ${({ $opacity }) => $opacity};
  padding: ${Space * 3}px;
  opacity: 0;
  animation: 100ms ${fadeIn} forwards cubic-bezier(0.2, 0.6, 0.35, 1);
  ${({ $delay }) =>
    css`
      animation-delay: ${$delay}ms;
    `};
`;

const RaceButton = styled(LinkButton)`
  background: ${Color.mono[700]};
  border-radius: ${Radius.MEDIUM};
  color: ${Color.mono[0]};
  padding: ${Space * 1}px ${Space * 2}px;

  &:hover {
    background: ${Color.mono[800]};
  }
`;

const RaceTitle = styled.h2`
  font-size: ${FontSize.LARGE};
  font-weight: bold;
`;

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
    <ItemWrapper $delay={index * 100}>
      <Stack horizontal alignItems="center" justifyContent="space-between">
        <Stack gap={Space * 1}>
          <RaceTitle>{race.name}</RaceTitle>
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
            <RaceButton href={`/races/${race.id}/race-card`}>投票</RaceButton>
          </Stack>
        </Stack.Item>
      </Stack>
    </ItemWrapper>
  );
};
RecentRaceList.Item = React.memo(Item);
