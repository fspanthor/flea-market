import { useEffect, useState } from "react";
import { FleaMarketFunction } from "../../../app/constants";

import { setGameState } from "../../../redux/slices/fleaMarketSlice";
import { sendFunctionRequest } from "../../service/functionRequest";
import Input from "../Common/Input";

const instructionsContinue = async (key: string) => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.INSTRUCTIONS_CONTINUE,
    params: { key: key },
  });
};

const getInstructions = async () => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.GET_INSTRUCTIONS,
  });
};

const Instructions = () => {
  const [instructions, setInstructions] = useState();

  useEffect(() => {
    const fetchInstructionsContent = async () => {
      const instructionsContent = await getInstructions();
      setInstructions(instructionsContent);
    };
    fetchInstructionsContent();
  }, []);

  return (
    <div>
      {instructions && (
        <Input gameFunction={instructionsContinue} reduxAction={setGameState} />
      )}
      {instructions}
      <ul>
        <li>DVDs: 10 - 60</li>
        <li>Hot Sauce: 70 - 250</li>
        <li>Switchblades: 300 - 900</li>
        <li>Fake Shoes: 1000 - 4500</li>
        <li>Cell Phones: 5000 - 14000</li>
        <li>Massage Chairs: 15000 - 30000</li>
      </ul>
      <div>PRESS ANY KEY TO CONTINUE......</div>
    </div>
  );
};

export default Instructions;
