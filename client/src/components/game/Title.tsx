import { FleaMarketFunction } from "../../gameFunctions/gameFunctions";
import { setGameState } from "../../redux/slices/fleaMarketSlice";
import { sendFunctionRequest } from "../service/functionRequest";
import Input from "./Input";

const instructionsPrompt = async (key: string) => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.INSTRUCTIONS,
    params: { key: key },
  });
};

const Title = () => {
  return (
    <div>
      <h1>FLEA MARKET</h1>
      <h2>A GAME BASED ON</h2>
      <h2>ACTUAL FLEA MARKET EXPERIENCES</h2>
      <h2>BY FSPANTHOR</h2>
      <h2>COPYRIGHT (2022)</h2>
      <h3>DO YOU WANT INSTRUCTIONS?</h3>
      <Input gameFunction={instructionsPrompt} reduxAction={setGameState} />
    </div>
  );
};

export default Title;
