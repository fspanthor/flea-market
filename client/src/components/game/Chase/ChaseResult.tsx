import { memo } from "react";
import {
  FleaMarketFunction,
  GameSubMenuEnum,
  spaceBarKey,
} from "../../../app/constants";
import { useAppSelector } from "../../../app/hooks";
import {
  selectGameSubMenu,
  selectSystemMessage,
  setExitChaseResponse,
  setGameSubMenu,
} from "../../../redux/slices/fleaMarketSlice";
import { sendFunctionRequest } from "../../service/functionRequest";
import Prompt from "../Input/Prompt";
import { chaseStartFunction } from "./Chase";

const startChaseFunction = async (key: string) => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.START_CHASE,
    params: { key: key },
  });
};

const exitChaseFunction = async (key: string) => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.EXIT_CHASE,
  });
};

const ChaseResult = () => {
  const systemMessage = useAppSelector(selectSystemMessage);
  const gameSubMenu = useAppSelector(selectGameSubMenu);

  return (
    <div>
      {gameSubMenu === GameSubMenuEnum.DIDNT_GET_AWAY && (
        <div>
          <div> YOU DIDNT GET AWAY..</div>
          <div>{systemMessage}</div>
          <Prompt
            promptText={"PRESS SPACE BAR TO CONTINUE"}
            promptFunction={chaseStartFunction}
            promptReduxAction={setGameSubMenu}
            allowableKeys={spaceBarKey}
          />
        </div>
      )}
      {gameSubMenu === GameSubMenuEnum.GOT_AWAY && (
        <div>
          <div>
            YOU GOT AWAY. EVEN IF THEY GOT YOUR NAME ON IT THEY WONT CATCH YOU
            NOW.
          </div>
          <Prompt
            promptText={"PRESS SPACE BAR TO CONTINUE"}
            promptFunction={exitChaseFunction}
            promptReduxAction={setExitChaseResponse}
          />
          <div>{systemMessage}</div>
        </div>
      )}
      {gameSubMenu === GameSubMenuEnum.HEAL && (
        <div>
          <div>DO YOU WANT A FULL HEAL FOR ${systemMessage}?</div>
          <Prompt
            promptText={"PRESS (Y) OR (N)"}
            promptFunction={startChaseFunction}
            promptReduxAction={setGameSubMenu}
          />
        </div>
      )}
      {gameSubMenu === GameSubMenuEnum.BRIBE_FAIL && (
        <div>
          <div>THE CORNDOG WAS MID SADLY. THE BRIBE WAS NOT ACCEPTED.</div>
          <Prompt
            promptText={"PRESS SPACE BAR TO CONTINUE"}
            promptFunction={startChaseFunction}
            promptReduxAction={setGameSubMenu}
          />
          <div>{systemMessage}</div>
        </div>
      )}
      {gameSubMenu === GameSubMenuEnum.GOT_SOME && (
        <div>
          <div>
            YOU SUCCESSFULLY BRIBED {systemMessage} FLEA MARKET STOOGES.
          </div>
          <Prompt
            promptText={"PRESS ANY KEY TO CONTINUE"}
            promptFunction={startChaseFunction}
            promptReduxAction={setGameSubMenu}
          />
          <div>{systemMessage}</div>
        </div>
      )}
      {gameSubMenu === GameSubMenuEnum.GOT_EM && (
        <div>
          <div>GOT EM. YOU BEAT THE CASE THERE WAS NO EVIDENCE.</div>
          <Prompt
            promptText={"PRESS ANY KEY TO CONTINUE"}
            promptFunction={startChaseFunction}
            promptReduxAction={setGameSubMenu}
          />
          <div>{systemMessage}</div>
        </div>
      )}
    </div>
  );
};

export default memo(ChaseResult);
