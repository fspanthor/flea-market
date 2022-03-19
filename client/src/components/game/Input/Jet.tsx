import { memo } from "react";
import { FleaMarketFunction } from "../../../app/constants";
import { setLocationResponse } from "../../../redux/slices/fleaMarketSlice";
import { sendFunctionRequest } from "../../service/functionRequest";
import Input from "../Common/Input";

export const jetPrompt = async (key: string) => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.CHANGE_LOCATION,
    params: { key: key },
  });
};

const jetAllowableKeys = ["1", "2", "3", "4", "5", "6"];

const Jet = () => {
  return (
    <div>
      <span>WHERE TO DUDE:</span>
      <ul>
        <li>(1) FLORIDA</li>
        <li>(2) ASHBY BART FLEA MARKET</li>
        <li>(3) SAN JOSE SUPER MALL</li>
        <li>(4) SOLANO SWAP MEET</li>
        <li>(5) COMMUNITY COLLEGE FLEA MARKET</li>
        <li>(6) HAUNTED MALL</li>
      </ul>
      <Input
        gameFunction={jetPrompt}
        reduxAction={setLocationResponse}
        allowableKeys={jetAllowableKeys}
      />
    </div>
  );
};

export default memo(Jet);
