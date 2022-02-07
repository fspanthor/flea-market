import { sendFunctionRequest } from "./service/functionRequest";

const Main = () => {
  const env = process.env.NODE_ENV;
  const prodUrl = "https://flea-market-wars.herokuapp.com/";

  const serverAddress =
    env === "production" ? prodUrl : "http://localhost:5000/";

  return (
    <div>
      <button
        onClick={() =>
          sendFunctionRequest({ function: "SET_PRICES" }, serverAddress)
        }
      >
        setPrices
      </button>
      <button
        onClick={() =>
          sendFunctionRequest(
            { function: "CHECK_MAXIMUM_BUY", params: { value: "dvds" } },
            serverAddress
          )
        }
      >
        checkMaximumBuy
      </button>
    </div>
  );
};

export default Main;
