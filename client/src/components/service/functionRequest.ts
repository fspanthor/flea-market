interface FuncType {
  function: string;
  params?: { value?: string; money?: number; amountChange?: number };
}

const env = process.env.NODE_ENV;
const prodUrl = "https://flea-market-wars.herokuapp.com/";

const serverAddress = env === "production" ? prodUrl : "http://localhost:5000/";

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
