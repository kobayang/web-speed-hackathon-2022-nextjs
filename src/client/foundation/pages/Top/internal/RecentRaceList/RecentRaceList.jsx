import React from "react";

import { Stack } from "../../../../components/layouts/Stack";
import { Space } from "../../../../styles/variables";

export const RecentRaceList = ({ children }) => {
  return (
    <Stack as="ul" gap={Space * 2}>
      {children}
    </Stack>
  );
};
