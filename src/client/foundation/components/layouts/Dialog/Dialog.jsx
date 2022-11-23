import React, { forwardRef } from "react";
import styled from "styled-components";

import { Color } from "../../../styles/variables";

const StyledDialog = styled.dialog`
  border: 1px solid ${Color.mono[400]};

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.25);
  }
`;

/**
 * @typedef Props
 * @type {object}
 * @property {Function} onClose
 */

/** @type {React.ForwardRefExoticComponent<{Props>} */
export const Dialog = forwardRef(({ children, onClose, open }, ref) => {
  return (
    <StyledDialog ref={ref} onClose={onClose}>
      {/* Do not render Dialog until open for improving TTI. */}
      {open !== undefined ? (open ? children : null) : children}
    </StyledDialog>
  );
});

Dialog.displayName = "Dialog";
