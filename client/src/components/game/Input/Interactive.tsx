import { memo } from "react";
import { GameStateEnum } from "../../../app/constants";
import { useAppSelector } from "../../../app/hooks";
import { selectGameState } from "../../../redux/slices/fleaMarketSlice";
import Chase from "../Chase/Chase";
import Buy from "./Buy";
import BuySellJet from "./BuySellJet";
import Instructions from "./Instructions";
import Jet from "./Jet";
import ManageInventory from "./ManageInventory";
import Sell from "./Sell";
import Title from "./Title";
import Event from "./Event";
import GameOver from "./GameOver";
import styled from "styled-components";

const StyledInteractive = styled.div`
  justify-content: center;
  align-content: center;
  flex-direction: column;
  display: flex;
  text-align: center;
  font-size 20px;
`;

const Interactive = () => {
  const gameState = useAppSelector(selectGameState);
  console.log("gameState: ", gameState);
  return (
    <StyledInteractive>
      {gameState === GameStateEnum.INIT && <Title />}
      {gameState === GameStateEnum.INSTRUCTIONS && <Instructions />}
      {gameState === GameStateEnum.MANAGE_INVENTORY && <ManageInventory />}
      {gameState === GameStateEnum.BUY_SELL_JET && <BuySellJet />}
      {gameState === GameStateEnum.JET && <Jet />}
      {gameState === GameStateEnum.BUY && <Buy />}
      {gameState === GameStateEnum.SELL && <Sell />}
      {gameState === GameStateEnum.CHASE && <Chase />}
      {gameState === GameStateEnum.EVENT && <Event />}
      {gameState === GameStateEnum.GAME_OVER && <GameOver />}
    </StyledInteractive>
  );
};

export default memo(Interactive);
