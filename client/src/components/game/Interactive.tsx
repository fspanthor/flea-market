import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectGameState } from "../../redux/slices/fleaMarketSlice";
import BuySellJet from "./BuySellJet";
import Title from "./Title";

enum GameStateEnum {
  INIT = "init",
  BUY_SELL_JET = "buySellJet",
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
    </div>
  );
};

export default Interactive;
