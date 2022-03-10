import { useCallback, useEffect } from "react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getPrices, getStash } from "../../../gameFunctions/gameFunctions";
import {
  selectPrices,
  selectStash,
  setPrices,
  setStash,
} from "../../../redux/slices/fleaMarketSlice";
import Prices from "./Prices";
import Stash from "./Stash";

const HUD = () => {
  const dispatch = useAppDispatch();
  const priceData = useAppSelector(selectPrices);
  const stashData = useAppSelector(selectStash);
  const [showPriceData, setShowPriceData] = useState(false);
  const [showStashData, setShowStashData] = useState(false);

  const fetchPrices = useCallback(async () => {
    const gameState = await getPrices();
    dispatch(setPrices(gameState));
    setShowPriceData(true);
  }, [dispatch]);

  const fetchStash = useCallback(async () => {
    const stashState = await getStash();
    dispatch(setStash(stashState));
    setShowStashData(true);
  }, [dispatch]);

  useEffect(() => {
    fetchPrices();
    fetchStash();
  }, [dispatch, fetchPrices, fetchStash]);

  return (
    <div>
      {showPriceData && <Prices priceData={priceData} />}
      {showStashData && <Stash stashData={stashData} />}
    </div>
  );
};
export default HUD;
