export enum GameStateEnum {
  INIT = "init",
  BUY_SELL_JET = "buySellJet",
  INSTRUCTIONS = "instructions",
  BUY = "buy",
  SELL = "sell",
  JET = "jet",
  MANAGE_INVENTORY = "manageInventory",
}

export enum GameSubMenuEnum {
  PROMPT_FOR_SHARK = "promptForShark",
  PROMPT_FOR_STASH = "promptForStash",
  PROMPT_FOR_BANK = "promptForBank",
  SHARK = "shark",
  STASH = "stash",
  BANK = "bank",
}

export enum FleaMarketFunction {
  CHECK_MAXIMUM_BUY = "CHECK_MAXIMUM_BUY",
  GET_PRICES = "GET_PRICES",
  BUY_SELL_JET = "BUY_SELL_JET",
  CHANGE_LOCATION = "CHANGE_LOCATION",
  INSTRUCTIONS_PROMPT = "INSTRUCTIONS_PROMPT",
  GET_INSTRUCTIONS = "GET_INSTRUCTIONS",
  INSTRUCTIONS_CONTINUE = "INSTRUCTIONS_CONTINUE",
  GET_STASH = "GET_STASH",
  GET_TRENCH_COAT = "GET_TRENCH_COAT",
  GET_LOCATION = "GET_LOCATION",
  NEW_GAME = "NEW_GAME",
  GET_DAY = "GET_DAY",
  BUY_ITEM = "BUY_ITEM",
  SELL_ITEM = "SELL_ITEM",
  STAGE_CURRENT_ITEM = "STAGE_CURRENT_ITEM",
  SHARK_CONTINUE = "SHARK_CONTINUE",
  STASH_CONTINUE = "STASH_CONTINUE",
  BANK_CONTINUE = "BANK_CONTINUE",
}

export const itemAllowableKeys = ["d", "h", "s", "f", "c", "m"];
