import { FleaMarketFunction } from "../../gameFunctions/gameFunctions";
import { setGameState } from "../../redux/slices/fleaMarketSlice";
import { sendFunctionRequest } from "../service/functionRequest";
import Input from "./Input";

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
      <Input
        gameFunction={buySellJetPrompt}
        reduxAction={setGameState}
        allowableKeys={buySellJetAllowableKeys}
      />
      <span>Will you buy, sell or jet?</span>
    </div>
  );
};

export default BuySellJet;
