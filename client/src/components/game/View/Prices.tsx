import { PricesStateType } from "../../../redux/slices/fleaMarketSlice";

interface priceDataType {
  priceData: PricesStateType;
}

const Prices = ({ priceData }: priceDataType) => {
  return (
    <div>
      <ul>
        <li>{`Golf Carts:  ${priceData.golfCarts}`}</li>
        <li>{`Cell Phones:  ${priceData.cellPhones}`}</li>
        <li>{`Pocket Knives:  ${priceData.pocketKnives}`}</li>
        <li>{`Hot Sauce:  ${priceData.hotSauce}`}</li>
        <li>{`DVDs:  ${priceData.dvds}`}</li>
        <li>{`Nachos:  ${priceData.nachos}`}</li>
      </ul>
    </div>
  );
};

export default Prices;
