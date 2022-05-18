import { memo, useCallback, useEffect } from "react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import {
  selectDay,
  selectLocation,
  selectPrices,
  selectStash,
  selectTrenchCoat,
  setDay,
  setLocation,
  setPrices,
  setStash,
  setTrenchCoat,
} from "../../../redux/slices/fleaMarketSlice";
import Prices from "./Prices";
import Stash from "./Stash";
import TrenchCoat from "./TrenchCoat";
import Location from "./Location";
import Date from "./Date";
import { sendFunctionRequest } from "../../service/functionRequest";
import { FleaMarketFunction } from "../../../app/constants";
import styled from "styled-components";

const getPrices = async () => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.GET_PRICES,
  });
};

const getStash = async () => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.GET_STASH,
  });
};

const getTrenchCoat = async () => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.GET_TRENCH_COAT,
  });
};

const getLocation = async () => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.GET_LOCATION,
  });
};

const getDay = async () => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.GET_DAY,
  });
};

const StyledHUD = styled.div`
  justify-content: center;
  align-content: center;
  flex-direction: column;
  display: flex;
  text-align: center;
  font-size: 15px;
`;

const StyledInventory = styled.div`
  position: relative;
  bottom: 31px;
`;

const StyledLocationAndDate = styled.div`
  position: relative;
  bottom: 26px;
  font-size: 15px;
`;

const HUD = () => {
  const dispatch = useAppDispatch();

  const priceData = useAppSelector(selectPrices);
  const stashData = useAppSelector(selectStash);
  const trenchCoatData = useAppSelector(selectTrenchCoat);
  const locationData = useAppSelector(selectLocation);
  const dayData = useAppSelector(selectDay);

  const [showPriceData, setShowPriceData] = useState(false);
  const [showStashData, setShowStashData] = useState(false);
  const [showTrenchCoatData, setShowTrenchCoatData] = useState(false);
  const [showLocationData, setShowLocationData] = useState(false);
  const [showDayData, setShowDayData] = useState(false);

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

  const fetchDay = useCallback(async () => {
    const dayState = await getDay();
    dispatch(setDay(dayState));
    setShowDayData(true);
  }, [dispatch]);

  useEffect(() => {
    fetchPrices();
    fetchStash();
    fetchTrenchCoat();
    fetchLocation();
    fetchDay();
  }, [
    dispatch,
    fetchDay,
    fetchLocation,
    fetchPrices,
    fetchStash,
    fetchTrenchCoat,
  ]);

  return (
    <StyledHUD>
      {showPriceData && <Prices priceData={priceData} />}
      <StyledInventory>
        {showStashData && <Stash stashData={stashData} />}
        {showTrenchCoatData && <TrenchCoat trenchCoatData={trenchCoatData} />}
      </StyledInventory>
      <StyledLocationAndDate>
        {showLocationData && <Location locationData={locationData} />}
        {showDayData && <Date dayData={dayData} />}
      </StyledLocationAndDate>
    </StyledHUD>
  );
};
export default memo(HUD);
