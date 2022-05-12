import { useCallback, useState } from "react";
import styled from "styled-components";
import { FleaMarketFunction } from "../../../app/constants";
import { sendFunctionRequest } from "../../service/functionRequest";

interface HighScoresType {
  player: string;
  score: number;
}
const getHighScores = async () => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.GET_HIGH_SCORES,
  });
};

//see if we can get this to auto scroll near the bottom of page
const StyledHighScores = styled.div`
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
`;

export const HighScores = () => {
  //   const [showHighScores, setShowHighScores] = useState(false);

  //   const fetchHighScores = useCallback(async () => {
  //     const highScores = await getHighScores();
  //     setShowHighScores(true);
  //   }, []);

  const zzz = getHighScores();

  const highScores: HighScoresType[] = [
    { player: "test", score: 20 },
    { player: "zzzz", score: 40 },
  ];

  return (
    <StyledHighScores>
      <div>HIGH SCORES</div>
      {highScores.map((highScore) => (
        <ol>{`${highScore.player}: ${highScore.score}`}</ol>
      ))}
    </StyledHighScores>
  );
};
