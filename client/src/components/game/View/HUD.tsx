import { useEffect } from "react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getPrices } from "../../../gameFunctions/gameFunctions";
import { selectPrices, setPrices } from "../../../redux/slices/fleaMarketSlice";
import Prices from "./Prices";

const HUD = () => {
  const dispatch = useAppDispatch();
  const priceData = useAppSelector(selectPrices);
  const [showPriceData, setShowPriceData] = useState(false);

  useEffect(() => {
    const fetchPrices = async () => {
      const gameState = await getPrices();
      dispatch(setPrices(gameState));
      setShowPriceData(true);
    };
    fetchPrices();
  }, [dispatch]);

  return <div>{showPriceData && <Prices priceData={priceData} />}</div>;
};
export default HUD;
