import { cursorBlinkAnimation } from "./animations";
import styled from "styled-components";

export const StyledCursor = styled.span`
  animation: ${cursorBlinkAnimation} 2s infinite;
`;
