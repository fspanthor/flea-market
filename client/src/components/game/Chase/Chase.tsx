import { memo } from "react";
import {
  FleaMarketFunction,
  GameSubMenuEnum,
  spaceBarKey,
} from "../../../app/constants";
import { useAppSelector } from "../../../app/hooks";
import {
  selectGameSubMenu,
  selectStooges,
  setGameSubMenu,
  setRunResponse,
} from "../../../redux/slices/fleaMarketSlice";
import { sendFunctionRequest } from "../../service/functionRequest";
import Prompt from "../Input/Prompt";
import ChaseHUD from "./ChaseHUD";
import ChaseResult from "./ChaseResult";

export const chaseStartFunction = async (key: string) => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.START_CHASE,
  });
};

const chaseRunFunction = async (key: string) => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.RUN,
  });
};

const Chase = () => {
  const gameSubMenu = useAppSelector(selectGameSubMenu);
  const stoogesData = useAppSelector(selectStooges);

  const chaseStartText = (stoogesData: number): string => {
    if (stoogesData === 0) {
      return "YOU ARE GETTING PULLED OVER FOR NO REASON BY THE CHAIRMAN OF THE FLEA MARKET GUILD";
    }
    if (stoogesData === 1) {
      return `YOU ARE GETTING PULLED OVER FOR NO REASON BY THE CHAIRMAN OF THE FLEA MARKET GUILD AND ${stoogesData} FLEA MARKET STOOGE`;
    } else {
      return `YOU ARE GETTING PULLED OVER FOR NO REASON BY THE CHAIRMAN OF THE FLEA MARKET GUILD AND ${stoogesData} FLEA MARKET STOOGES`;
    }
  };

  return (
    <div>
      <ChaseHUD />
      {gameSubMenu === GameSubMenuEnum.CHASE_START && (
        <div>
          <div>{chaseStartText(stoogesData)}</div>
          <Prompt
            promptText={"PRESS SPACEBAR TO CONTINUE"}
            promptFunction={chaseStartFunction}
            promptReduxAction={setGameSubMenu}
            allowableKeys={spaceBarKey}
          />
        </div>
      )}
      {gameSubMenu === GameSubMenuEnum.RUN && (
        <Prompt
          promptText={
            "YOU HAVE NO CORNDOGS TO BRIBE WITH.. PRESS SPACE BAR TO RUN"
          }
          promptFunction={chaseRunFunction}
          promptReduxAction={setRunResponse}
          allowableKeys={spaceBarKey}
        />
      )}
      {gameSubMenu === GameSubMenuEnum.RUN_OR_BRIBE && (
        <Prompt
          promptText={"WILL YOU (R)UN OR (B)RIBE?"}
          promptFunction={chaseStartFunction}
          promptReduxAction={setGameSubMenu}
        />
      )}
      {(gameSubMenu === GameSubMenuEnum.DIDNT_GET_AWAY ||
        gameSubMenu === GameSubMenuEnum.GOT_AWAY ||
        gameSubMenu === GameSubMenuEnum.GOT_EM ||
        gameSubMenu === GameSubMenuEnum.HEAL ||
        gameSubMenu === GameSubMenuEnum.GOT_SOME) && <ChaseResult />}
    </div>
  );
};

export default memo(Chase);
