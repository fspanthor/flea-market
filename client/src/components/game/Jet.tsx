import { FleaMarketFunction } from "../../gameFunctions/gameFunctions";
import { setLocationResponse } from "../../redux/slices/fleaMarketSlice";
import { sendFunctionRequest } from "../service/functionRequest";
import Input from "./Input";

export const jetPrompt = async (key: string) => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.CHANGE_LOCATION,
    params: { key: key },
  });
};

const Jet = () => {
  return (
    <div>
      <Input gameFunction={jetPrompt} reduxAction={setLocationResponse} />
      <span>Where to?</span>
    </div>
  );
};

export default Jet;
