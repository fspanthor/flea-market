import { memo, useCallback } from "react";
import { useAppSelector } from "../../app/hooks";
import {
  checkMaximumBuy,
  FleaMarketFunction,
} from "../../gameFunctions/gameFunctions";
import {
  selectCurrentItem,
  selectMaximumBuy,
  setMaximumBuy,
  setPostBuy,
} from "../../redux/slices/fleaMarketSlice";
import { sendFunctionRequest } from "../service/functionRequest";
import Input from "./Input";
import InputString from "./InputString";

const Buy = () => {
  const buyItem = useCallback(async (item: string, amount: number) => {
    return await sendFunctionRequest({
      function: FleaMarketFunction.BUY_ITEM,
      params: { item: item, amount: amount },
    });
  }, []);

  const maxBuy = useAppSelector(selectMaximumBuy);
  const currentItem = useAppSelector(selectCurrentItem);
  return (
    <div>
      WHAT WILL YOU BUY?
      <Input gameFunction={checkMaximumBuy} reduxAction={setMaximumBuy} />
      {maxBuy !== undefined && currentItem.length > 0 && (
        <div>
          <div>HOW MANY {currentItem.toUpperCase()} WILL YOU BUY?</div>
          <div>YOU CAN AFFORD({maxBuy})</div>
          <InputString gameFunction={buyItem} reduxAction={setPostBuy} />
        </div>
      )}
    </div>
  );
};

export default memo(Buy);
