import { useCallback } from "react";
import {
  FleaMarketFunction,
  itemAllowableKeys,
  numberKeys,
} from "../../../app/constants";
import { useAppSelector } from "../../../app/hooks";
import {
  selectCurrentItem,
  setBuySellResponse,
  setCurrentItem,
} from "../../../redux/slices/fleaMarketSlice";
import { sendFunctionRequest } from "../../service/functionRequest";
import Input from "../Common/Input";
import InputString from "../Common/InputString";

const stageCurrentItem = async (key: string) => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.STAGE_CURRENT_ITEM,
    params: { key: key },
  });
};

const Sell = () => {
  const sellItem = useCallback(async (item: string, amount: number) => {
    return await sendFunctionRequest({
      function: FleaMarketFunction.SELL_ITEM,
      params: { item: item, amount: amount },
    });
  }, []);

  const currentItem = useAppSelector(selectCurrentItem);
  return (
    <div>
      WHAT WILL YOU SELL?{" "}
      {currentItem.length === 0 && (
        <div>
          <Input
            gameFunction={stageCurrentItem}
            reduxAction={setCurrentItem}
            allowableKeys={itemAllowableKeys}
          />
        </div>
      )}
      {currentItem.length > 0 && (
        <div>
          <div>HOW MANY {currentItem.toUpperCase()} WILL YOU SELL?</div>
          <InputString
            gameFunction={sellItem}
            reduxAction={setBuySellResponse}
            allowableKeys={numberKeys}
          />
        </div>
      )}
    </div>
  );
};

export default Sell;
