import { memo, useCallback } from "react";
import { FleaMarketFunction } from "../../../app/constants";
import { useAppSelector } from "../../../app/hooks";

import {
  selectCurrentItem,
  selectMaximumBuy,
  setBuyResponse,
  setMaximumBuy,
} from "../../../redux/slices/fleaMarketSlice";
import { sendFunctionRequest } from "../../service/functionRequest";
import Input from "../Common/Input";
import InputString from "../Common/InputString";

const checkMaximumBuy = async (value: string) => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.CHECK_MAXIMUM_BUY,
    params: { value: value },
  });
};

const Buy = () => {
  const buyItem = useCallback(async (item: string, amount: number) => {
    return await sendFunctionRequest({
      function: FleaMarketFunction.BUY_ITEM,
      params: { item: item, amount: amount },
    });
  }, []);

  const buyAllowableKeys = ["d", "h", "s", "f", "c", "m"];

  const maxBuy = useAppSelector(selectMaximumBuy);
  const currentItem = useAppSelector(selectCurrentItem);
  return (
    <div>
      WHAT WILL YOU BUY?
      {maxBuy === undefined && (
        <Input
          gameFunction={checkMaximumBuy}
          reduxAction={setMaximumBuy}
          allowableKeys={buyAllowableKeys}
        />
      )}
      {maxBuy !== undefined && currentItem.length > 0 && (
        <div>
          <div>HOW MANY {currentItem.toUpperCase()} WILL YOU BUY?</div>
          <div>YOU CAN AFFORD({maxBuy})</div>
          <InputString gameFunction={buyItem} reduxAction={setBuyResponse} />
        </div>
      )}
    </div>
  );
};

export default memo(Buy);
