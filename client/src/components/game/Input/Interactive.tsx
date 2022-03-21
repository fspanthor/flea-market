import { memo } from "react";
import { GameStateEnum } from "../../../app/constants";
import { useAppSelector } from "../../../app/hooks";
import { selectGameState } from "../../../redux/slices/fleaMarketSlice";
import Buy from "./Buy";
import BuySellJet from "./BuySellJet";
import Instructions from "./Instructions";
import Jet from "./Jet";
import ManageInventory from "./ManageInventory";
import Sell from "./Sell";
import Title from "./Title";

const Interactive = () => {
  const gameState = useAppSelector(selectGameState);
  console.log("gameState: ", gameState);
  return (
    <div>
      {gameState === GameStateEnum.INIT && <Title />}
      {gameState === GameStateEnum.INSTRUCTIONS && <Instructions />}
      {gameState === GameStateEnum.MANAGE_INVENTORY && <ManageInventory />}
      {gameState === GameStateEnum.BUY_SELL_JET && <BuySellJet />}
      {gameState === GameStateEnum.JET && <Jet />}
      {gameState === GameStateEnum.BUY && <Buy />}
      {gameState === GameStateEnum.SELL && <Sell />}
    </div>
  );
};

export default memo(Interactive);
