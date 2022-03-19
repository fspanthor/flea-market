import { FleaMarketFunction } from "../../../app/constants";
import { setGameState } from "../../../redux/slices/fleaMarketSlice";
import { sendFunctionRequest } from "../../service/functionRequest";
import Input from "../Common/Input";

const instructionsPrompt = async (key: string) => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.INSTRUCTIONS,
    params: { key: key },
  });
};

const titleAllowableKeys = ["y", "n"];

const Title = () => {
  return (
    <div>
      <h1>FLEA MARKET</h1>
      <h2>A GAME BASED ON</h2>
      <h2>ACTUAL FLEA MARKET EXPERIENCES</h2>
      <h2>BY FSPANTHOR</h2>
      <h2>COPYRIGHT (2022)</h2>
      <h3>DO YOU WANT INSTRUCTIONS? PRESS (Y) OR (N) KEY</h3>
      <Input
        gameFunction={instructionsPrompt}
        reduxAction={setGameState}
        allowableKeys={titleAllowableKeys}
      />
    </div>
  );
};

export default Title;
