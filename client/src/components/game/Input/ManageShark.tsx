import {
  FleaMarketFunction,
  GameSubMenuEnum,
  numberKeys,
} from "../../../app/constants";
import { useAppSelector } from "../../../app/hooks";
import {
  selectCash,
  selectGameSubMenu,
  setRepayBorrowSharkResponse,
} from "../../../redux/slices/fleaMarketSlice";
import { sendFunctionRequest } from "../../service/functionRequest";
import InputString from "../Common/InputString";

const repayShark = async (amount: number) => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.REPAY_SHARK,
    params: { amount: amount },
  });
};

const borrowFromShark = async (amount: number) => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.BORROW_FROM_SHARK,
    params: { amount: amount },
  });
};

const ManageShark = () => {
  const currentCash = useAppSelector(selectCash);
  const gameSubMenu = useAppSelector(selectGameSubMenu);
  return (
    <div>
      {gameSubMenu === GameSubMenuEnum.SHARK && (
        <div>
          HOW MUCH TO REPAY?
          <InputString
            gameFunction={repayShark}
            reduxAction={setRepayBorrowSharkResponse}
            allowableKeys={numberKeys}
            comparator={currentCash}
          />
        </div>
      )}
      {gameSubMenu === GameSubMenuEnum.SHARK_BORROW && (
        //if shark is completely paid off can borrow 2000
        <div>
          HOW MUCH TO BORROW?
          <InputString
            gameFunction={borrowFromShark}
            reduxAction={setRepayBorrowSharkResponse}
            allowableKeys={numberKeys}
            comparator={currentCash > 0 ? currentCash : 2000}
          />
        </div>
      )}
    </div>
  );
};
export default ManageShark;
