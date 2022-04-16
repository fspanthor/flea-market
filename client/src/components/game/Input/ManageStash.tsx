import {
  FleaMarketFunction,
  GameSubMenuEnum,
  itemAllowableKeys,
} from "../../../app/constants";
import { useAppSelector } from "../../../app/hooks";
import {
  selectCurrentItem,
  selectGameSubMenu,
  selectStash,
  selectTrenchCoat,
  setItemToTransfer,
  setTransferItemToStashResponse,
  setTransferItemToTrenchCoatResponse,
} from "../../../redux/slices/fleaMarketSlice";
import { sendFunctionRequest } from "../../service/functionRequest";
import Input from "../Common/Input";
import InputString from "../Common/InputString";

const selectItemToManage = async (key: string) => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.SELECT_ITEM_TO_MANAGE,
    params: { key: key },
  });
};

const transferItemToStash = async (amount: number) => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.TRANSFER_ITEM_TO_STASH,
    params: { amount: amount },
  });
};

const transferItemToTrenchCoat = async (amount: number) => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.TRANSFER_ITEM_TO_TRENCH_COAT,
    params: { amount: amount },
  });
};

const ManageStash = () => {
  const gameSubMenu = useAppSelector(selectGameSubMenu);
  const currentItem = useAppSelector(selectCurrentItem);
  //added this typing to look up by key from appSelector
  const currentStash: Record<string, any> = useAppSelector(selectStash);
  const currentTrenchCoat: Record<string, any> =
    useAppSelector(selectTrenchCoat);

  const manageStashAllowableKeys = ["Q", "q"];
  manageStashAllowableKeys.push(...itemAllowableKeys);

  return (
    <div>
      {currentItem.length === 0 && gameSubMenu === GameSubMenuEnum.STASH && (
        <div>
          WHICH ITEM WOULD YOU LIKE TO TRANSFER? (PRESS (Q) TO STOP
          TRANSFERRING)
          <Input
            gameFunction={selectItemToManage}
            reduxAction={setItemToTransfer}
            allowableKeys={manageStashAllowableKeys}
          />
        </div>
      )}
      {currentItem.length > 0 && gameSubMenu === GameSubMenuEnum.STASH && (
        <div>
          HOW MANY {currentItem.toUpperCase()} TO STASH?
          <InputString
            gameFunction={transferItemToStash}
            reduxAction={setTransferItemToStashResponse}
            comparator={currentTrenchCoat[currentItem]}
          />
        </div>
      )}
      {currentItem.length > 0 &&
        gameSubMenu === GameSubMenuEnum.TRANSFER_TO_TRENCH_COAT && (
          <div>
            HOW MANY {currentItem.toUpperCase()} TO TRENCH COAT?
            <InputString
              gameFunction={transferItemToTrenchCoat}
              reduxAction={setTransferItemToTrenchCoatResponse}
              comparator={currentStash[currentItem]}
            />
          </div>
        )}
    </div>
  );
};
export default ManageStash;
