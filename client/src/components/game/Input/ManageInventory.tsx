import {
  FleaMarketFunction,
  GameSubMenuEnum,
  yOrN,
} from "../../../app/constants";
import { useAppSelector } from "../../../app/hooks";
import {
  selectGameSubMenu,
  setGameStateAndSubMenu,
  setGameSubMenu,
} from "../../../redux/slices/fleaMarketSlice";
import { sendFunctionRequest } from "../../service/functionRequest";
import Prompt from "./Prompt";
import ManageShark from "./ManageShark";
import ManageBank from "./ManageBank";
import ManageStash from "./ManageStash";

const sharkContinueFunction = async (key: string) => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.SHARK_CONTINUE,
    params: { key: key },
  });
};

const stashContinueFunction = async (key: string) => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.STASH_CONTINUE,
    params: { key: key },
  });
};

const bankContinueFunction = async (key: string) => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.BANK_CONTINUE,
    params: { key: key },
  });
};

const ManageInventory = () => {
  const gameSubMenu = useAppSelector(selectGameSubMenu);

  return (
    <div>
      {gameSubMenu === GameSubMenuEnum.PROMPT_FOR_SHARK && (
        <Prompt
          promptText={"DO YOU WISH TO VISIT THE LOAN SHARK?"}
          promptFunction={sharkContinueFunction}
          promptReduxAction={setGameSubMenu}
          allowableKeys={yOrN}
        />
      )}
      {gameSubMenu === GameSubMenuEnum.PROMPT_FOR_STASH && (
        <Prompt
          promptText={"DO YOU WISH TO TRANSFER ITEMS TO YOUR STASH?"}
          promptFunction={stashContinueFunction}
          promptReduxAction={setGameSubMenu}
          allowableKeys={yOrN}
        />
      )}
      {gameSubMenu === GameSubMenuEnum.PROMPT_FOR_BANK && (
        <Prompt
          promptText={"DO YOU WISH TO VISIT THE BANK?"}
          promptFunction={bankContinueFunction}
          promptReduxAction={setGameStateAndSubMenu}
          allowableKeys={yOrN}
        />
      )}
      {(gameSubMenu === GameSubMenuEnum.SHARK ||
        GameSubMenuEnum.SHARK_BORROW) && <ManageShark />}
      {(gameSubMenu === GameSubMenuEnum.STASH ||
        gameSubMenu === GameSubMenuEnum.TRANSFER_TO_TRENCH_COAT) && (
        <ManageStash />
      )}
      {(gameSubMenu === GameSubMenuEnum.BANK ||
        GameSubMenuEnum.BANK_WITHDRAW) && <ManageBank />}
    </div>
  );
};
export default ManageInventory;

//when you jet to Florida game state be set to manageInventory rather than buy sell rec.. gameSubMenu will be blank
//manage inventory will not be changed until you complete all three prompts for shark, bank and stash
//shark bank and stash will be shown based on gameSubMenu state
//answering no to stash or exiting stash will clear subGameMenu state and change gameState to buy sell rec
