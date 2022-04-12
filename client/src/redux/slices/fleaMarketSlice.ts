import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameStateEnum, GameSubMenuEnum } from "../../app/constants";
import type { RootState } from "../../app/store";

export interface SetLocationResponseType {
  day: number;
  gameState: string;
  gameSubMenu?: string;
  location: string;
  prices: PricesStateType;
  debt: number;
  bank: number;
}

export interface PricesStateType {
  massageChairs: number;
  cellPhones: number;
  switchblades: number;
  hotSauce: number;
  dvds: number;
  fakeShoes: number;
}

export interface StashStateType {
  massageChairs: number;
  cellPhones: number;
  switchblades: number;
  hotSauce: number;
  dvds: number;
  fakeShoes: number;
  bank: number;
  debt: number;
}

export interface TrenchCoatStateType {
  massageChairs: number;
  cellPhones: number;
  switchblades: number;
  hotSauce: number;
  dvds: number;
  fakeShoes: number;
  cornDogs: number;
  cash: number;
  maxHold: number;
}

interface GameManagerStateType {
  gameState?: string;
  gameSubMenu?: string;
  day: number;
  maximumBuy: number | null;
  currentItem: string;
  systemMessage: string;
}

interface GameStateAndSubMenuType {
  gameState?: string;
  gameSubMenu?: string;
}

interface SetRepayBorrowSharkResponseType {
  debt: number;
  cash: number;
  gameSubMenu: string;
}

interface SetDepositWithdrawBankResponseType {
  bank: number;
  cash: number;
  gameSubMenu: string;
}

interface SetDepositWithdrawBankResponseConclusionType {
  bank: number;
  cash: number;
  gameState: string;
  gameSubMenu: string;
}

interface MaximumBuyStateType {
  maximumBuy: number;
  currentItem: string;
}

interface SetItemToTransferType {
  currentItem: string;
  gameSubMenu: string;
}

interface FleaMarketStateType {
  value: number;
  prices: PricesStateType;
  gameManager: GameManagerStateType;
  stash: StashStateType;
  trenchCoat: TrenchCoatStateType;
  location: string;
  chase: ChaseStateType;
}

interface ChaseStateType {
  health: number;
  stooges: number;
}

interface BuySellResponseStateType {
  trenchCoat: TrenchCoatStateType;
  maximumBuy: number | null;
  currentItem: string;
  gameState: string;
}

interface SetTransferItemToStashResponseType {
  stash: StashStateType;
  trenchCoat: TrenchCoatStateType;
  gameSubMenu: string;
}

interface SetTransferItemToTrenchCoatResponseType {
  trenchCoat: TrenchCoatStateType;
  stash: StashStateType;
  gameSubMenu: string;
  currentItem: string;
}

interface RunResponseStateType {
  gameSubMenu: string;
  chase: ChaseStateType;
  systemMessage: string;
}

const initialState: FleaMarketStateType = {
  value: 0,
  prices: {
    massageChairs: 0,
    cellPhones: 0,
    switchblades: 0,
    hotSauce: 0,
    dvds: 0,
    fakeShoes: 0,
  },
  stash: {
    massageChairs: 0,
    cellPhones: 0,
    switchblades: 0,
    hotSauce: 0,
    dvds: 0,
    fakeShoes: 0,
    bank: 0,
    debt: 0,
  },
  trenchCoat: {
    massageChairs: 0,
    cellPhones: 0,
    switchblades: 0,
    hotSauce: 0,
    dvds: 0,
    fakeShoes: 0,
    cornDogs: 0,
    cash: 0,
    maxHold: 0,
  },
  chase: {
    health: 0,
    stooges: 0,
  },
  gameManager: {
    gameState: GameStateEnum.INIT,
    gameSubMenu: "",
    day: 0,
    maximumBuy: null,
    currentItem: "",
    systemMessage: "",
  },
  location: "",
};

//reducer
export const fleaMarketSlice = createSlice({
  name: "fleaMarket",
  initialState,
  reducers: {
    setPrices: (state, action: PayloadAction<PricesStateType>) => {
      state.prices = action.payload;
    },
    setGameState: (state, action: PayloadAction<string>) => {
      state.gameManager.gameState = action.payload;
    },
    setGameSubMenu: (state, action: PayloadAction<string>) => {
      state.gameManager.gameSubMenu = action.payload;
    },
    setChase: (state, action: PayloadAction<ChaseStateType>) => {
      state.chase = action.payload;
    },
    setGameStateAndSubMenu: (
      state,
      action: PayloadAction<GameStateAndSubMenuType>
    ) => {
      state.gameManager.gameState = action.payload.gameState;
      state.gameManager.gameSubMenu = action.payload.gameSubMenu;
    },
    setStash: (state, action: PayloadAction<StashStateType>) => {
      state.stash = action.payload;
    },
    setCornDogs: (state, action: PayloadAction<number>) => {
      state.trenchCoat.cornDogs = action.payload;
    },
    setTransferItemToStashResponse: (
      state,
      action: PayloadAction<SetTransferItemToStashResponseType>
    ) => {
      state.stash = action.payload.stash;
      state.trenchCoat = action.payload.trenchCoat;
      state.gameManager.gameSubMenu = action.payload.gameSubMenu;
    },
    setTransferItemToTrenchCoatResponse: (
      state,
      action: PayloadAction<SetTransferItemToTrenchCoatResponseType>
    ) => {
      state.stash = action.payload.stash;
      state.trenchCoat = action.payload.trenchCoat;
      state.gameManager.gameSubMenu = action.payload.gameSubMenu;
      state.gameManager.currentItem = action.payload.currentItem;
    },
    setTrenchCoat: (state, action: PayloadAction<TrenchCoatStateType>) => {
      state.trenchCoat = action.payload;
    },
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    setDay: (state, action: PayloadAction<number>) => {
      state.gameManager.day = action.payload;
    },
    setCurrentItem: (state, action: PayloadAction<string>) => {
      state.gameManager.currentItem = action.payload;
    },
    setChaseResponse: (state, action: PayloadAction<RunResponseStateType>) => {
      state.gameManager.gameSubMenu = action.payload.gameSubMenu;
      state.chase = action.payload.chase;
      state.gameManager.systemMessage = action.payload.systemMessage;
    },
    setItemToTransfer: (
      state,
      action: PayloadAction<SetItemToTransferType>
    ) => {
      state.gameManager.currentItem = action.payload.currentItem;
      state.gameManager.gameSubMenu = action.payload.gameSubMenu;
    },
    setRepayBorrowSharkResponse: (
      state,
      action: PayloadAction<SetRepayBorrowSharkResponseType>
    ) => {
      state.stash.debt = action.payload.debt;
      state.trenchCoat.cash = action.payload.cash;
      state.gameManager.gameSubMenu = action.payload.gameSubMenu;
    },
    setDepositWithdrawBankResponse: (
      state,
      action: PayloadAction<SetDepositWithdrawBankResponseType>
    ) => {
      state.stash.bank = action.payload.bank;
      state.trenchCoat.cash = action.payload.cash;
      state.gameManager.gameSubMenu = action.payload.gameSubMenu;
    },
    setDepositWithdrawBankResponseConclusion: (
      state,
      action: PayloadAction<SetDepositWithdrawBankResponseConclusionType>
    ) => {
      state.stash.bank = action.payload.bank;
      state.trenchCoat.cash = action.payload.cash;
      state.gameManager.gameSubMenu = action.payload.gameSubMenu;
      state.gameManager.gameState = action.payload.gameState;
    },
    setMaximumBuy: (state, action: PayloadAction<MaximumBuyStateType>) => {
      state.gameManager.maximumBuy = action.payload.maximumBuy;
      state.gameManager.currentItem = action.payload.currentItem;
    },
    setBuySellResponse: (
      state,
      action: PayloadAction<BuySellResponseStateType>
    ) => {
      state.trenchCoat = action.payload.trenchCoat;
      state.gameManager.maximumBuy = action.payload.maximumBuy;
      state.gameManager.currentItem = action.payload.currentItem;
      state.gameManager.gameState = action.payload.gameState;
    },
    setLocationResponse: (
      state,
      action: PayloadAction<SetLocationResponseType>
    ) => {
      state.location = action.payload.location;
      state.gameManager.day = action.payload.day;
      state.gameManager.gameState = action.payload.gameState;
      state.gameManager.gameSubMenu = action.payload?.gameSubMenu;
      state.prices = action.payload.prices;
      state.stash.debt = action.payload.debt;
      state.stash.bank = action.payload.bank;
    },
  },
});

//actions
export const {
  setPrices,
  setGameState,
  setStash,
  setTrenchCoat,
  setLocation,
  setLocationResponse,
  setDay,
  setMaximumBuy,
  setBuySellResponse,
  setCurrentItem,
  setGameSubMenu,
  setGameStateAndSubMenu,
  setRepayBorrowSharkResponse,
  setDepositWithdrawBankResponse,
  setDepositWithdrawBankResponseConclusion,
  setTransferItemToStashResponse,
  setTransferItemToTrenchCoatResponse,
  setItemToTransfer,
  setChase,
  setChaseResponse,
  setCornDogs,
} = fleaMarketSlice.actions;

//selectors
export const selectPrices = (state: RootState) => state.fleaMarket.prices;
export const selectStash = (state: RootState) => state.fleaMarket.stash;
export const selectLocation = (state: RootState) => state.fleaMarket.location;
export const selectTrenchCoat = (state: RootState) =>
  state.fleaMarket.trenchCoat;
export const selectGameState = (state: RootState) =>
  state.fleaMarket.gameManager.gameState;
export const selectGameSubMenu = (state: RootState) =>
  state.fleaMarket.gameManager.gameSubMenu;
export const selectDay = (state: RootState) => state.fleaMarket.gameManager.day;
export const selectMaximumBuy = (state: RootState) =>
  state.fleaMarket.gameManager.maximumBuy;
export const selectCurrentItem = (state: RootState) =>
  state.fleaMarket.gameManager.currentItem;
export const selectSystemMessage = (state: RootState) =>
  state.fleaMarket.gameManager.systemMessage;
export const selectDebt = (state: RootState) => state.fleaMarket.stash.debt;
export const selectBank = (state: RootState) => state.fleaMarket.stash.bank;
export const selectCash = (state: RootState) =>
  state.fleaMarket.trenchCoat.cash;
export const selectStooges = (state: RootState) =>
  state.fleaMarket.chase.stooges;
export const selectHealth = (state: RootState) => state.fleaMarket.chase.health;
export const selectCornDogs = (state: RootState) =>
  state.fleaMarket.trenchCoat.cornDogs;

export default fleaMarketSlice.reducer;
