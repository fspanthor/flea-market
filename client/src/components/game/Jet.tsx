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
      <span>WHERE TO DUDE:</span>
      <ul>
        <li>(1) FLORIDA</li>
        <li>(2) ASHBY BART FLEA MARKET</li>
        <li>(3) SAN JOSE SUPER MALL</li>
        <li>(4) SOLANO SWAP MEET</li>
        <li>(5) COMMUNITY COLLEGE FLEA MARKET</li>
        <li>(6) HAUNTED MALL</li>
      </ul>
    </div>
  );
};

export default Jet;
