interface FuncType {
  function: string;
  params?: {
    item?: string;
    amount?: number;
    value?: string;
    money?: number;
    amountChange?: number;
    key?: string;
  };
}

const env = process.env.NODE_ENV;
// const serverAddress =
//   env === "development" ? "http://localhost:5000/api" : "/api";
console.log(env);
const serverAddress =
  env === "development"
    ? "http://localhost:5000/api"
    : "https://flea-market-game.herokuapp.com/api";

//const serverAddress = "http://localhost:8000/api/";

export const sendFunctionRequest = async (func: FuncType) => {
  const response = await fetch(serverAddress, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      function: func.function,
      ...(func.params && { params: func.params }),
    }),
    credentials: "include",
  });
  const data = await response.json();
  return data;
};
