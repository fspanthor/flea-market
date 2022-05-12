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
  setGameSubMenu,
} from "../../../redux/slices/fleaMarketSlice";
import { sendFunctionRequest } from "../../service/functionRequest";
import InputString from "../Common/InputString";

const sharkContinueFunction = async (key: string) => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.SHARK_CONTINUE,
    params: { key: key },
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
                gameFunction={sharkContinueFunction}
                reduxAction={setGameSubMenu}
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
        </div>
      </div>
    </div>
  );
};

export default memo(GameOver);
