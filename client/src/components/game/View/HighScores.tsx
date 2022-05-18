import { useEffect } from "react";
import { useCallback, useState } from "react";
import styled from "styled-components";
import { FleaMarketFunction } from "../../../app/constants";
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

//see if we can get this to auto scroll near the bottom of page
const StyledHighScores = styled.div`
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
`;

export const HighScores = () => {
  const [highScores, setHighScores] = useState<null | HighScoresType[]>();

  const fetchHighScores = useCallback(async () => {
    //pass number of high scores to display here
    const highScores = await getHighScores(20);
    setHighScores(highScores);
  }, []);

  useEffect(() => fetchHighScores(), [fetchHighScores]);

  return (
    <div>
      {highScores && (
        <StyledHighScores>
          <div>HIGH SCORES</div>
          {highScores.map((highScore, index) => (
            <ol key={index}>{`${highScore.user_name}: ${highScore.score}`}</ol>
          ))}
        </StyledHighScores>
      )}
    </div>
  );
};
