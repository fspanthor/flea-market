import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectPrices, setPrices } from "../../redux/slices/fleaMarketSlice";
import { getPrices } from "../../gameFunctions/gameFunctions";

const Prices = () => {
  const dispatch = useAppDispatch();
  const displayPrices = useAppSelector(selectPrices);

  const prices = async () => {
    const gameState = await getPrices();
    dispatch(setPrices(gameState));
  };

  return (
    <div>
      <button onClick={prices}>prices</button>
      <ul>
        <li>{`Golf Carts:  ${displayPrices.golfCarts}`}</li>
        <li>{`Cell Phones:  ${displayPrices.cellPhones}`}</li>
        <li>{`Pocket Knives:  ${displayPrices.pocketKnives}`}</li>
        <li>{`Hot Sauce:  ${displayPrices.hotSauce}`}</li>
        <li>{`DVDs:  ${displayPrices.dvds}`}</li>
        <li>{`Nachos:  ${displayPrices.nachos}`}</li>
      </ul>
    </div>
  );
};

export default Prices;
