import { FleaMarketFunction, itemAllowableKeys } from "../../../app/constants";
import { useAppSelector } from "../../../app/hooks";
import {
  selectCurrentItem,
  setCurrentItem,
} from "../../../redux/slices/fleaMarketSlice";
import { sendFunctionRequest } from "../../service/functionRequest";
import Input from "../Common/Input";

const stageCurrentItem = async (key: string) => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.STAGE_CURRENT_ITEM,
    params: { key: key },
  });
};

const Sell = () => {
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
        </div>
      )}
    </div>
  );
};

export default Sell;
