import { cursorBlinkAnimation } from "./animations";
import styled from "styled-components";

export const StyledCursor = styled.span`
  animation: ${cursorBlinkAnimation} 2s infinite;
`;

export const StyledCursorWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  position: relative;
  right: 190px;
  top: 19px;
  font-size: 25px;
  color: #00ff41;
`;

export const GreyText = styled.div`
  color: grey;
`;
