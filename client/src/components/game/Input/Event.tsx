import { memo } from "react";
import { FleaMarketFunction, spaceBarKey } from "../../../app/constants";
import { useAppSelector } from "../../../app/hooks";
import {
  selectSystemMessage,
  setGameStateAndSubMenu,
} from "../../../redux/slices/fleaMarketSlice";
import { sendFunctionRequest } from "../../service/functionRequest";
import Prompt from "./Prompt";

const eventContinueFunction = async () => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.EVENT_CONTINUE,
  });
};

const Event = () => {
  const systemMessage = useAppSelector(selectSystemMessage);

  return (
    <div>
      event
      <div>
        <div>{systemMessage}</div>
        <Prompt
          promptText={"PRESS SPACE BAR TO CONTINUE"}
          promptFunction={eventContinueFunction}
          promptReduxAction={setGameStateAndSubMenu}
          allowableKeys={spaceBarKey}
        />
      </div>
    </div>
  );
};

export default memo(Event);
