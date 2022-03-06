import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectGameState } from "../../redux/slices/fleaMarketSlice";
import BuySellJet from "./BuySellJet";
import Instructions from "./Instructions";
import Title from "./Title";

enum GameStateEnum {
  INIT = "init",
  BUY_SELL_JET = "buySellJet",
  INSTRUCTIONS = "instructions",
}

const Interactive = () => {
  const gameState = useAppSelector(selectGameState);

  useEffect(() => {
    console.log(gameState);
  }, [gameState]);

  return (
    <div>
      {gameState === GameStateEnum.INIT && <Title />}
      {gameState === GameStateEnum.BUY_SELL_JET && <BuySellJet />}
      {gameState === GameStateEnum.INSTRUCTIONS && <Instructions />}
    </div>
  );
};

export default Interactive;
