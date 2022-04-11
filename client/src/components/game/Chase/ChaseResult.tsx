import { memo } from "react";
import { FleaMarketFunction, GameSubMenuEnum } from "../../../app/constants";
import { useAppSelector } from "../../../app/hooks";
import {
  selectGameSubMenu,
  selectSystemMessage,
  setGameStateAndSubMenu,
} from "../../../redux/slices/fleaMarketSlice";
import { sendFunctionRequest } from "../../service/functionRequest";
import Prompt from "../Input/Prompt";

const runOrBribeContinueFunction = async () => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.RUN_OR_BRIBE_CONTINUE,
  });
};

const ChaseResult = () => {
  const systemMessage = useAppSelector(selectSystemMessage);
  const gameSubMenu = useAppSelector(selectGameSubMenu);

  return (
    <div>
      {gameSubMenu === GameSubMenuEnum.CHASE_RESULT && (
        <div>
          <div>{systemMessage}</div>
          <Prompt
            promptText={"PRESS SPACE BAR TO CONTINUE"}
            promptFunction={runOrBribeContinueFunction}
            promptReduxAction={setGameStateAndSubMenu}
          />
        </div>
      )}
    </div>
  );
};

export default memo(ChaseResult);
