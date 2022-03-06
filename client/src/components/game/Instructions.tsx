import { useEffect, useState } from "react";
import {
  instructionsContinue,
  getInstructions,
} from "../../gameFunctions/gameFunctions";
import Input from "./Input";

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
      <Input gameFunction={instructionsContinue} />
      {instructions}
    </div>
  );
};

export default Instructions;
