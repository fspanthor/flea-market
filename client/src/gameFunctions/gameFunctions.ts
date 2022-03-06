import { sendFunctionRequest } from "../components/service/functionRequest";

enum FleaMarketFunction {
  RETRIEVE_GAME_STATE = "RETRIEVE_GAME_STATE",
  CHECK_MAXIMUM_BUY = "CHECK_MAXIMUM_BUY",
  CHANGE_WALLET = "CHANGE_WALLET",
  SET_PRICES = "SET_PRICES",
  GET_PRICES = "GET_PRICES",
  BUY_SELL_JET = "BUY_SELL_JET",
  INSTRUCTIONS = "INSTRUCTIONS",
  GET_INSTRUCTIONS = "GET_INSTRUCTIONS",
  INSTRUCTIONS_CONTINUE = "INSTRUCTIONS_CONTINUE",
}
export const setPrices = async () => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.SET_PRICES,
  });
};

export const getPrices = async () => {
  const serverResponse = await sendFunctionRequest({
    function: FleaMarketFunction.GET_PRICES,
  });
  const {
    cell_phones: cellPhones,
    dvds,
    golf_carts: golfCarts,
    hot_sauce: hotSauce,
    nachos,
    pocket_knives: pocketKnives,
  } = serverResponse;
  const formattedResponse = Object.assign(
    {},
    { cellPhones, dvds, golfCarts, hotSauce, nachos, pocketKnives }
  );
  return formattedResponse;
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

export const buySellJetPrompt = async (key: string) => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.BUY_SELL_JET,
    params: { key: key },
  });
};

export const instructionsPrompt = async (key: string) => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.INSTRUCTIONS,
    params: { key: key },
  });
};

export const instructionsContinue = async (key: string) => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.INSTRUCTIONS_CONTINUE,
    params: { key: key },
  });
};

export const getInstructions = async () => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.GET_INSTRUCTIONS,
  });
};