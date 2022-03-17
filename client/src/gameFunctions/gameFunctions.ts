import { sendFunctionRequest } from "../components/service/functionRequest";

export enum FleaMarketFunction {
  RETRIEVE_GAME_STATE = "RETRIEVE_GAME_STATE",
  CHECK_MAXIMUM_BUY = "CHECK_MAXIMUM_BUY",
  CHANGE_WALLET = "CHANGE_WALLET",
  SET_PRICES = "SET_PRICES",
  GET_PRICES = "GET_PRICES",
  BUY_SELL_JET = "BUY_SELL_JET",
  JET = "JET",
  CHANGE_LOCATION = "CHANGE_LOCATION",
  INSTRUCTIONS = "INSTRUCTIONS",
  GET_INSTRUCTIONS = "GET_INSTRUCTIONS",
  INSTRUCTIONS_CONTINUE = "INSTRUCTIONS_CONTINUE",
  GET_STASH = "GET_STASH",
  GET_TRENCH_COAT = "GET_TRENCH_COAT",
  GET_LOCATION = "GET_LOCATION",
  NEW_GAME = "NEW_GAME",
  GET_DAY = "GET_DAY",
}
// export const setPrices = async () => {
//   return await sendFunctionRequest({
//     function: FleaMarketFunction.SET_PRICES,
//   });
// };

export const getPrices = async () => {
  const serverResponse = await sendFunctionRequest({
    function: FleaMarketFunction.GET_PRICES,
  });
  const {
    cell_phones: cellPhones,
    dvds,
    massage_chairs: massageChairs,
    hot_sauce: hotSauce,
    fake_shoes: fakeShoes,
    switchblades,
  } = serverResponse;
  const formattedResponse = Object.assign(
    {},
    { cellPhones, dvds, massageChairs, hotSauce, fakeShoes, switchblades }
  );
  return formattedResponse;
};

export const getStash = async () => {
  const serverResponse = await sendFunctionRequest({
    function: FleaMarketFunction.GET_STASH,
  });
  const {
    cell_phones: cellPhones,
    dvds,
    massage_chairs: massageChairs,
    hot_sauce: hotSauce,
    fake_shoes: fakeShoes,
    switchblades,
    bank,
    debt,
  } = serverResponse;
  const formattedResponse = Object.assign(
    {},
    {
      cellPhones,
      dvds,
      massageChairs,
      hotSauce,
      fakeShoes,
      switchblades,
      bank,
      debt,
    }
  );
  return formattedResponse;
};

export const getTrenchCoat = async () => {
  const serverResponse = await sendFunctionRequest({
    function: FleaMarketFunction.GET_TRENCH_COAT,
  });
  const {
    cell_phones: cellPhones,
    dvds,
    massage_chairs: massageChairs,
    hot_sauce: hotSauce,
    fake_shoes: fakeShoes,
    switchblades,
    corn_dogs: cornDogs,
    cash,
    max_hold: maxHold,
  } = serverResponse;
  const formattedResponse = Object.assign(
    {},
    {
      cellPhones,
      dvds,
      massageChairs,
      hotSauce,
      fakeShoes,
      switchblades,
      cornDogs,
      cash,
      maxHold,
    }
  );
  return formattedResponse;
};

export const getLocation = async () => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.GET_LOCATION,
  });
};

export const getDay = async () => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.GET_DAY,
  });
};

// export const changeWallet = async (money: number, amountChange: number) => {
//   return await sendFunctionRequest({
//     function: FleaMarketFunction.CHANGE_WALLET,
//     params: { money: money, amountChange: amountChange },
//   });
// };

export const checkMaximumBuy = async (value: string) => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.CHECK_MAXIMUM_BUY,
    params: { value: value },
  });
};

// export const retrieveGameState = async () => {
//   return await sendFunctionRequest({
//     function: FleaMarketFunction.RETRIEVE_GAME_STATE,
//   });
// };
