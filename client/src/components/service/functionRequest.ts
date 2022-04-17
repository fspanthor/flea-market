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
const prodUrl = "https://flea-market-tycoon.herokuapp.com/";

//const serverAddress = env === "production" ? prodUrl : "http://localhost:5000/";
const serverAddress = "http://localhost:5000/";
console.log("server address: ", serverAddress);

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
