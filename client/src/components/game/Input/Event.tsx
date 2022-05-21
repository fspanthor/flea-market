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
  setGameStateAndSubMenu,
  setYesOrNoContinue,
} from "../../../redux/slices/fleaMarketSlice";
import { GreyText } from "../../../styles/commonStyles";
import { sendFunctionRequest } from "../../service/functionRequest";
import Prompt from "./Prompt";

const eventContinueFunction = async () => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.EVENT_CONTINUE,
  });
};

const eventYesOrNoFunction = async (key: string) => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.YES_OR_NO_CONTINUE,
    params: { key: key },
  });
};

const Event = () => {
  const systemMessage = useAppSelector(selectSystemMessage);
  const gameSubMenu = useAppSelector(selectGameSubMenu);

  return (
    <div>
      <div>
        {gameSubMenu !== GameSubMenuEnum.YES_OR_NO_EVENT && (
          <div>
            <GreyText>{systemMessage}</GreyText>
            <Prompt
              promptText={"PRESS SPACE BAR TO CONTINUE"}
              promptFunction={eventContinueFunction}
              promptReduxAction={setGameStateAndSubMenu}
              allowableKeys={spaceBarKey}
            />
          </div>
        )}
        {gameSubMenu === GameSubMenuEnum.YES_OR_NO_EVENT && (
          <div>
            <GreyText>{systemMessage}</GreyText>
            <Prompt
              promptText={"PRESS (Y) OR (N)"}
              promptFunction={eventYesOrNoFunction}
              promptReduxAction={setYesOrNoContinue}
              allowableKeys={yOrN}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Event);
