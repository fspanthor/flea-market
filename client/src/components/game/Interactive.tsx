import { GameStateEnum } from "../../app/constants";
import { useAppSelector } from "../../app/hooks";
import { selectGameState } from "../../redux/slices/fleaMarketSlice";
import BuySellJet from "./BuySellJet";
import Instructions from "./Instructions";
import Jet from "./Jet";
import Title from "./Title";

const Interactive = () => {
  const gameState = useAppSelector(selectGameState);
  return (
    <div>
      {gameState === GameStateEnum.INIT && <Title />}
      {gameState === GameStateEnum.BUY_SELL_JET && <BuySellJet />}
      {gameState === GameStateEnum.JET && <Jet />}
      {gameState === GameStateEnum.INSTRUCTIONS && <Instructions />}
    </div>
  );
};

export default Interactive;
