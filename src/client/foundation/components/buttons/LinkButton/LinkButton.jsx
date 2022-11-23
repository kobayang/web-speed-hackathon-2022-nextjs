import Link from "next/link";
import styled from "styled-components";

export const LinkButton = styled(Link).attrs({ prefetch: true })`
  display: block;
`;
