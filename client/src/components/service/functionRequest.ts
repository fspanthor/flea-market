interface FuncType {
  function: string;
  params?: { value: string };
}

export const sendFunctionRequest = (func: FuncType, serverAddress: string) => {
  fetch(serverAddress, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      function: func.function,
      ...(func.params && { params: func.params }),
    }),
    credentials: "include",
  }).then((res) => res.json().then((data) => console.log(data)));
};
