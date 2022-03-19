import { memo } from "react";
import { FleaMarketFunction } from "../../../app/constants";
import { setGameState } from "../../../redux/slices/fleaMarketSlice";
import { sendFunctionRequest } from "../../service/functionRequest";
import Input from "../Common/Input";

export const buySellJetPrompt = async (key: string) => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.BUY_SELL_JET,
    params: { key: key },
  });
};

const buySellJetAllowableKeys = ["b", "s", "j"];

const BuySellJet = () => {
  return (
    <div>
      <span>WILL YOU (B)UY (S)ELL OR (J)ET?</span>
      <Input
        gameFunction={buySellJetPrompt}
        reduxAction={setGameState}
        allowableKeys={buySellJetAllowableKeys}
      />
    </div>
  );
};

export default memo(BuySellJet);
