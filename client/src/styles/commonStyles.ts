import { cursorBlinkAnimation } from "./animations";
import styled from "styled-components";

export const StyledCursor = styled.span`
  animation: ${cursorBlinkAnimation} 2s infinite;
`;

export const StyledCursorWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
`;
