import {
  checkMaximumBuy,
  setPrices,
  retrieveGameState,
} from "../gameFunctions/gameFuntions";
import { sendFunctionRequest } from "./service/functionRequest";

const Main = () => {
  const startGame = async () => {
    console.log(await setPrices());
  };

  return (
    <div>
      <div>
        <h1>FLEA MARKET</h1>
        <button onClick={startGame} color="blue">
          press any key to start..{" "}
        </button>
      </div>
      <button onClick={() => sendFunctionRequest({ function: "SET_PRICES" })}>
        setPrices
      </button>
      <button onClick={() => checkMaximumBuy("dvds")}>check max buy</button>
      <button onClick={async () => console.log(await retrieveGameState())}>
        retrieve game state
      </button>
    </div>
  );
};

export default Main;
