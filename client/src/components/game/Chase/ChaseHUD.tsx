import { useCallback, useEffect, useState } from "react";
import { FleaMarketFunction } from "../../../app/constants";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectCornDogs,
  selectHealth,
  selectStooges,
  setChase,
  setCornDogs,
} from "../../../redux/slices/fleaMarketSlice";
import { sendFunctionRequest } from "../../service/functionRequest";

const getChase = async () => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.GET_CHASE,
  });
};

const getCornDogs = async () => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.GET_CORN_DOGS,
  });
};

const ChaseHUD = () => {
  const dispatch = useAppDispatch();

  const stoogeData = useAppSelector(selectStooges);
  const healthData = useAppSelector(selectHealth);
  const cornDogData = useAppSelector(selectCornDogs);

  const [showChaseData, setShowChaseData] = useState(false);
  const [showCornDogs, setShowCornDogsData] = useState(false);

  const fetchChase = useCallback(async () => {
    const gameState = await getChase();
    dispatch(setChase(gameState));
    setShowChaseData(true);
  }, [dispatch]);

  const fetchCornDogs = useCallback(async () => {
    const gameState = await getCornDogs();
    dispatch(setCornDogs(gameState));
    setShowCornDogsData(true);
  }, [dispatch]);

  useEffect(() => {
    fetchChase();
    fetchCornDogs();
  }, [fetchChase, fetchCornDogs]);

  return (
    <div>
      {showChaseData && showCornDogs && (
        <div>
          <span>Health: {healthData}%</span>
          <span>Stooges: {stoogeData}</span>
          <span>Corndogs: {cornDogData}</span>
        </div>
      )}
    </div>
  );
};
export default ChaseHUD;
