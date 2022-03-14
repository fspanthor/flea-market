import { FleaMarketFunction } from "../../gameFunctions/gameFunctions";
import { setLocation } from "../../redux/slices/fleaMarketSlice";
import { sendFunctionRequest } from "../service/functionRequest";
import Input from "./Input";

export const jetPrompt = async (key: string) => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.JET,
    params: { key: key },
  });
};

const Jet = () => {
  return (
    <div>
      <Input gameFunction={jetPrompt} reduxAction={setLocation} />
      <span>Where to?</span>
    </div>
  );
};

export default Jet;
