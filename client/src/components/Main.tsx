import {
  checkMaximumBuy,
  setPrices,
  retrieveGameState,
} from "../gameFunctions/gameFunctions";
import { sendFunctionRequest } from "./service/functionRequest";
import { increment, selectCount } from "../redux/slices/fleaMarketSlice";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import Prices from "./game/Prices";

const Main = () => {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const startGame = async () => {
    console.log(await setPrices());
  };

  return (
    <div>
      <div>
        <Prices />
        <h1>FLEA MARKET</h1>
        <button onClick={() => dispatch(increment())}>{count}</button>
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
