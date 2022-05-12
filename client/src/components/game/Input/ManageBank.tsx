import {
  FleaMarketFunction,
  GameSubMenuEnum,
  numberKeys,
} from "../../../app/constants";
import { useAppSelector } from "../../../app/hooks";
import {
  selectBank,
  selectCash,
  selectGameSubMenu,
  setDepositWithdrawBankResponse,
  setDepositWithdrawBankResponseConclusion,
} from "../../../redux/slices/fleaMarketSlice";
import { sendFunctionRequest } from "../../service/functionRequest";
import InputString from "../Common/InputString";

const depositToBank = async (amount: number) => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.DEPOSIT_TO_BANK,
    params: { amount: amount },
  });
};

const withdrawFromBank = async (amount: number) => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.WITHDRAW_FROM_BANK,
    params: { amount: amount },
  });
};

const ManageBank = () => {
  const gameSubMenu = useAppSelector(selectGameSubMenu);
  const currentCash = useAppSelector(selectCash);
  const currentBank = useAppSelector(selectBank);
  return (
    <div>
      {gameSubMenu === GameSubMenuEnum.BANK && (
        <div>
          HOW MUCH TO DEPOSIT?
          <InputString
            gameFunction={depositToBank}
            reduxAction={setDepositWithdrawBankResponse}
            allowableKeys={numberKeys}
            comparator={currentCash}
          />
        </div>
      )}
      {gameSubMenu === GameSubMenuEnum.BANK_WITHDRAW && (
        <div>
          HOW MUCH TO WITHDRAW?
          <InputString
            gameFunction={withdrawFromBank}
            reduxAction={setDepositWithdrawBankResponseConclusion}
            allowableKeys={numberKeys}
            comparator={currentBank}
          />
        </div>
      )}
    </div>
  );
};

export default ManageBank;
