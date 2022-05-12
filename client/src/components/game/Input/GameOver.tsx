import { memo } from "react";
import {
  FleaMarketFunction,
  GameSubMenuEnum,
  lowercaseLetters,
  numberKeys,
  spaceBarKey,
  specialCharacters,
  uppercaseLetters,
} from "../../../app/constants";
import { useAppSelector } from "../../../app/hooks";
import {
  selectGameSubMenu,
  setGameStateAndSubMenu,
} from "../../../redux/slices/fleaMarketSlice";
import { sendFunctionRequest } from "../../service/functionRequest";
import InputString from "../Common/InputString";
import Prompt from "./Prompt";

const persistHighScoreFunction = async () => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.PERSIST_HIGH_SCORE,
  });
};

const restartGameFunction = async () => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.RESTART_GAME,
  });
};

const GameOver = () => {
  const gameSubMenu = useAppSelector(selectGameSubMenu);

  return (
    <div>
      <div>
        game over
        <div>
          {gameSubMenu === GameSubMenuEnum.HIGH_SCORE && (
            <div>
              <span>HIGH SCORE!! ENTER YOUR NAME TO RECORD YOUR SCORE: </span>
              <InputString
                gameFunction={persistHighScoreFunction}
                reduxAction={setGameStateAndSubMenu}
                allowableKeys={[
                  ...lowercaseLetters,
                  ...uppercaseLetters,
                  ...numberKeys,
                  ...specialCharacters,
                  ...spaceBarKey,
                ]}
              />
            </div>
          )}
          {gameSubMenu === GameSubMenuEnum.WIN && (
            <div>
              <span>
                LOOKS LIKE YOU MANAGED TO PAY OFF THE SHARK! YOU WIN! PLAY AGAIN
                TO TRY TO GET A HIGH SCORE AND IMPRESS YOUR FRIENDS.
              </span>
              <Prompt
                promptText={"PRESS SPACE BAR TO QUIT TO MAIN MENU"}
                promptFunction={restartGameFunction}
                promptReduxAction={setGameStateAndSubMenu}
                allowableKeys={spaceBarKey}
              />
            </div>
          )}
          {gameSubMenu === GameSubMenuEnum.CLEAR && (
            <div>
              <span>
                L. PAY OFF THE SHARK AND SURVIVE 30 DAYS TO WIN. DONT GIVE UP.
              </span>
              <Prompt
                promptText={"PRESS SPACE BAR TO QUIT TO MAIN MENU"}
                promptFunction={restartGameFunction}
                promptReduxAction={setGameStateAndSubMenu}
                allowableKeys={spaceBarKey}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(GameOver);
