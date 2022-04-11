import { memo } from "react";
import {
  FleaMarketFunction,
  GameSubMenuEnum,
  runOrBribeKeys,
  spaceBarKey,
} from "../../../app/constants";
import { useAppSelector } from "../../../app/hooks";
import {
  selectGameSubMenu,
  selectStooges,
  setGameStateAndSubMenu,
  setChaseResponse,
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

const chaseRunFunction = async () => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.RUN,
  });
};

const runOrBribeFunction = async (key: string) => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.RUN_OR_BRIBE,
    params: { key: key },
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
            promptReduxAction={setGameStateAndSubMenu}
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
          promptReduxAction={setChaseResponse}
          allowableKeys={spaceBarKey}
        />
      )}
      {gameSubMenu === GameSubMenuEnum.RUN_OR_BRIBE && (
        <Prompt
          promptText={"WILL YOU (R)UN OR (B)RIBE?"}
          promptFunction={runOrBribeFunction}
          promptReduxAction={setChaseResponse}
          allowableKeys={runOrBribeKeys}
        />
      )}
      {(GameSubMenuEnum.CHASE_RESULT ||
        gameSubMenu === GameSubMenuEnum.HEAL) && <ChaseResult />}
    </div>
  );
};

export default memo(Chase);
