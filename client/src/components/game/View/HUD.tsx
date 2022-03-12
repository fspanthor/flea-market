import { useCallback, useEffect } from "react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  getLocation,
  getPrices,
  getStash,
  getTrenchCoat,
} from "../../../gameFunctions/gameFunctions";
import {
  selectLocation,
  selectPrices,
  selectStash,
  selectTrenchCoat,
  setLocation,
  setPrices,
  setStash,
  setTrenchCoat,
} from "../../../redux/slices/fleaMarketSlice";
import Prices from "./Prices";
import Stash from "./Stash";
import TrenchCoat from "./TrenchCoat";
import Location from "./Location";

const HUD = () => {
  const dispatch = useAppDispatch();
  const priceData = useAppSelector(selectPrices);
  const stashData = useAppSelector(selectStash);
  const trenchCoatData = useAppSelector(selectTrenchCoat);
  const locationData = useAppSelector(selectLocation);
  const [showPriceData, setShowPriceData] = useState(false);
  const [showStashData, setShowStashData] = useState(false);
  const [showTrenchCoatData, setShowTrenchCoatData] = useState(false);
  const [showLocationData, setShowLocationData] = useState(false);

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

  const fetchTrenchCoat = useCallback(async () => {
    const trenchCoatState = await getTrenchCoat();
    dispatch(setTrenchCoat(trenchCoatState));
    setShowTrenchCoatData(true);
  }, [dispatch]);

  const fetchLocation = useCallback(async () => {
    const locationState = await getLocation();
    dispatch(setLocation(locationState));
    setShowLocationData(true);
  }, [dispatch]);

  useEffect(() => {
    fetchPrices();
    fetchStash();
    fetchTrenchCoat();
    fetchLocation();
  }, [dispatch, fetchLocation, fetchPrices, fetchStash, fetchTrenchCoat]);

  return (
    <div>
      {showPriceData && <Prices priceData={priceData} />}
      {showStashData && <Stash stashData={stashData} />}
      {showTrenchCoatData && <TrenchCoat trenchCoatData={trenchCoatData} />}
      {showLocationData && <Location locationData={locationData} />}
    </div>
  );
};
export default HUD;
