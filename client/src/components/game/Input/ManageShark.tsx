import { FleaMarketFunction, GameSubMenuEnum } from "../../../app/constants";
import { useAppSelector } from "../../../app/hooks";
import {
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
  const gameSubMenu = useAppSelector(selectGameSubMenu);
  return (
    <div>
      {gameSubMenu === GameSubMenuEnum.SHARK && (
        <div>
          HOW MUCH TO REPAY?
          <InputString
            gameFunction={repayShark}
            reduxAction={setRepayBorrowSharkResponse}
          />
        </div>
      )}
      {gameSubMenu === GameSubMenuEnum.SHARK_BORROW && (
        <div>
          HOW MUCH TO BORROW?
          <InputString
            gameFunction={borrowFromShark}
            reduxAction={setRepayBorrowSharkResponse}
          />
        </div>
      )}
    </div>
  );
};
export default ManageShark;