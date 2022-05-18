import { memo } from "react";
import styled from "styled-components";
import { FleaMarketFunction, yOrN } from "../../../app/constants";
import { setGameState } from "../../../redux/slices/fleaMarketSlice";
import { sendFunctionRequest } from "../../service/functionRequest";
import Input from "../Common/Input";
import { HighScores } from "../View/HighScores";

const instructionsPrompt = async (key: string) => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.INSTRUCTIONS_PROMPT,
    params: { key: key },
  });
};

const StyledMainTitle = styled.div`
  margin-top: 10px;
  margin-bottom: 0px;
  font-size: 65px;
`;

const StyledTitle = styled.div`
  margin-top: 10px;
  margin-bottom: 0px;
  font-size: 35px;
`;

const Title = () => {
  return (
    <div>
      <StyledMainTitle>FLEA MARKET</StyledMainTitle>
      <StyledTitle>A GAME BASED ON</StyledTitle>
      <StyledTitle>ACTUAL FLEA MARKET EXPERIENCES</StyledTitle>
      <StyledTitle>BY FSPANTHOR</StyledTitle>
      <StyledTitle>COPYRIGHT (2022)</StyledTitle>
      <StyledTitle>DO YOU WANT INSTRUCTIONS? PRESS (Y) OR (N) KEY</StyledTitle>
      <Input
        gameFunction={instructionsPrompt}
        reduxAction={setGameState}
        allowableKeys={yOrN}
      />
      <HighScores />
    </div>
  );
};

export default memo(Title);
