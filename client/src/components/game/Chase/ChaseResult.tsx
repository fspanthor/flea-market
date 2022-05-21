import { memo } from "react";
import {
  FleaMarketFunction,
  GameSubMenuEnum,
  spaceBarKey,
  yOrN,
} from "../../../app/constants";
import { useAppSelector } from "../../../app/hooks";
import {
  selectGameSubMenu,
  selectSystemMessage,
  setExitChase,
} from "../../../redux/slices/fleaMarketSlice";
import { GreyText } from "../../../styles/commonStyles";
import { sendFunctionRequest } from "../../service/functionRequest";
import Prompt from "../Input/Prompt";

const runOrBribeContinueFunction = async () => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.RUN_OR_BRIBE_CONTINUE,
  });
};

const healFunction = async () => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.HEAL,
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
          <GreyText>
            <Prompt
              promptText={"PRESS SPACE BAR TO CONTINUE"}
              promptFunction={runOrBribeContinueFunction}
              promptReduxAction={setExitChase}
              allowableKeys={spaceBarKey}
            />
          </GreyText>
        </div>
      )}
      {gameSubMenu === GameSubMenuEnum.HEAL && (
        <div>
          <div>{systemMessage}</div>
          <GreyText>
            <Prompt
              promptText={"PRESS (Y) TO HEAL OR (N) TO DECLINE"}
              promptFunction={healFunction}
              promptReduxAction={setExitChase}
              allowableKeys={yOrN}
            />
          </GreyText>
        </div>
      )}
    </div>
  );
};

export default memo(ChaseResult);
