import { checkMaximumBuy, setPrices } from "../gameFunctions/gameFunctions";
import Interactive from "./game/Interactive";
import HUD from "./game/View/HUD";
import { useAppSelector } from "../app/hooks";
import { selectGameState } from "../redux/slices/fleaMarketSlice";
import { GameStateEnum } from "../app/constants";
//import AudioPlayer from "./game/AudioPlayer";

const Main = () => {
  const gameState = useAppSelector(selectGameState);

  const startGame = async () => {
    console.log(await setPrices());
  };

  return (
    <div>
      <div>
        {gameState !== GameStateEnum.INIT &&
          gameState !== GameStateEnum.INSTRUCTIONS && <HUD />}
        <Interactive />
        <button onClick={startGame} color="blue">
          press any key to start..{" "}
        </button>
      </div>
      {/* {gameState !== GameStateEnum.INIT && <AudioPlayer />} */}
      <button onClick={() => checkMaximumBuy("dvds")}>check max buy</button>
    </div>
  );
};

export default Main;
