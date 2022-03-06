import { buySellJetPrompt } from "../../gameFunctions/gameFunctions";
import Input from "./Input";

const BuySellJet = () => {
  return (
    <div>
      <Input gameFunction={buySellJetPrompt} />
      <span>Will you buy, sell or jet?</span>
    </div>
  );
};

export default BuySellJet;
