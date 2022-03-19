import Interactive from "./game/Input/Interactive";
import HUD from "./game/View/HUD";
import { useAppSelector } from "../app/hooks";
import { selectGameState, setGameState } from "../redux/slices/fleaMarketSlice";
import { FleaMarketFunction, GameStateEnum } from "../app/constants";
import { useEffect } from "react";
import { sendFunctionRequest } from "./service/functionRequest";
import AudioPlayer from "./game/Common/AudioPlayer";

const Main = () => {
  const gameState = useAppSelector(selectGameState);

  const newGame = async () => {
    return await sendFunctionRequest({
      function: FleaMarketFunction.NEW_GAME,
    });
  };

  useEffect(() => {
    const startNewGame = async () => {
      const initGameState = await newGame();
      setGameState(initGameState);
    };
    startNewGame();
  }, []);

  return (
    <div>
      <div>
        {gameState !== GameStateEnum.INIT &&
          gameState !== GameStateEnum.INSTRUCTIONS && <HUD />}
        <Interactive />
      </div>
      {gameState !== GameStateEnum.INIT && <AudioPlayer />}
    </div>
  );
};

export default Main;
