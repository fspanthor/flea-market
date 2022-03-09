import { useEffect, useState } from "react";
import { FleaMarketFunction } from "../../gameFunctions/gameFunctions";
import { sendFunctionRequest } from "../service/functionRequest";
import Input from "./Input";

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
      <div>press any key to continue</div>
      {instructions && <Input gameFunction={instructionsContinue} />}
      {instructions}
    </div>
  );
};

export default Instructions;
