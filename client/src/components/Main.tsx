import { checkMaximumBuy, setPrices } from "../gameFunctions/gameFunctions";
import Prices from "./game/Prices";
import Interactive from "./game/Interactive";

const Main = () => {
  const startGame = async () => {
    console.log(await setPrices());
  };

  return (
    <div>
      <div>
        <Prices />
        <Interactive />
        <button onClick={startGame} color="blue">
          press any key to start..{" "}
        </button>
      </div>
      <button onClick={() => checkMaximumBuy("dvds")}>check max buy</button>
    </div>
  );
};

export default Main;
