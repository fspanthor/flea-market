import { memo } from "react";
import { useEffect } from "react";
import { useCallback, useState } from "react";
import styled, { keyframes } from "styled-components";
import { FleaMarketFunction } from "../../../app/constants";
import { cursorBlinkAnimation } from "../../../styles/animations";
import { sendFunctionRequest } from "../../service/functionRequest";

interface HighScoresType {
  user_name: string;
  score: number;
}
const getHighScores = async (amount: number) => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.GET_HIGH_SCORES,
    params: { amount: amount },
  });
};

const creditRoll = keyframes`
0% {
  transform: translateY(-70%);
}
100% {
  transform: translateY(0%);
}
`;

//see if we can get this to auto scroll near the bottom of page
const StyledHighScoreWrapper = styled.div`
  margin-top: 0px;
  margin-left: auto;
  margin-right: auto;
  height: 120px;
  overflow: hidden;
  position: relative;
  z-index: 1;
`;

const StyledScores = styled.div`
  text-align: center;
  animation: ${creditRoll} 10s;
  position: relative;
  z-index: 0;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const StyledTitle = styled.div`
  font-size: 25px;
`;

const StyledHighScores = styled.div`
  position: relative;
  top: 130px;
  color: grey;
`;

const StyledScoreLine = styled.ol`
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 15px;
`;

export const HighScores = () => {
  const [highScores, setHighScores] = useState<null | HighScoresType[]>(null);

  const fetchHighScores = useCallback(async () => {
    //pass number of high scores to display here
    const highScores = await getHighScores(10);
    setHighScores(highScores);
  }, []);

  useEffect(() => fetchHighScores(), [fetchHighScores]);

  // const highScores = [
  //   {
  //     user_name: "longnamehignamrelongnamehignamrelongnamehignamre",
  //     score: 5000,
  //   },
  //   { user_name: "longnamehighscore2", score: 5100 },
  //   { user_name: "longnamehighscore3", score: 5000 },
  //   { user_name: "longnazscore4", score: 5100 },
  //   { user_name: "longnamehighscore5", score: 5000 },
  //   { user_name: "longnamehighscore6", score: 5100 },
  //   { user_name: "longnamehighscore7", score: 5000 },
  //   { user_name: "zzzzzzz8", score: 5100 },
  //   { user_name: "9", score: 5000 },
  //   { user_name: "10", score: 5100 },
  // ];

  return (
    <StyledHighScores>
      {highScores && (
        <div>
          <StyledTitle>HIGH SCORES</StyledTitle>
          <StyledHighScoreWrapper>
            <StyledScores>
              {highScores.map((highScore, index) => (
                <StyledScoreLine
                  key={index}
                >{`${highScore.user_name}: ${highScore.score}`}</StyledScoreLine>
              ))}
            </StyledScores>
          </StyledHighScoreWrapper>
        </div>
      )}
    </StyledHighScores>
  );
};

export default memo(HighScores);
