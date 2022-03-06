import { instructionsPrompt } from "../../gameFunctions/gameFunctions";
import Input from "./Input";

const Title = () => {
  return (
    <div>
      <h1>FLEA MARKET</h1>
      <h2>A GAME BASED ON</h2>
      <h2>ACTUAL FLEA MARKET EXPERIENCES</h2>
      <h2>BY FSPANTHOR</h2>
      <h2>COPYRIGHT (2022)</h2>
      <h3>DO YOU WANT INSTRUCTIONS?</h3>
      <Input gameFunction={instructionsPrompt} />
    </div>
  );
};

export default Title;
