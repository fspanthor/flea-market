import { sendFunctionRequest } from "../components/service/functionRequest";

enum FleaMarketFunction {
  RETRIEVE_GAME_STATE = "RETRIEVE_GAME_STATE",
  CHECK_MAXIMUM_BUY = "CHECK_MAXIMUM_BUY",
  CHANGE_WALLET = "CHANGE_WALLET",
  SET_PRICES = "SET_PRICES",
}
export const setPrices = async () => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.SET_PRICES,
  });
};

export const changeWallet = async (money: number, amountChange: number) => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.CHANGE_WALLET,
    params: { money: money, amountChange: amountChange },
  });
};

export const checkMaximumBuy = async (value: string) => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.CHECK_MAXIMUM_BUY,
    params: { value: value },
  });
};

export const retrieveGameState = async () => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.RETRIEVE_GAME_STATE,
  });
};
