import { memo } from "react";
import { PricesStateType } from "../../../redux/slices/fleaMarketSlice";

interface priceDataType {
  priceData: PricesStateType;
}

const Prices = ({ priceData }: priceDataType) => {
  return (
    <div>
      <h3>Hey dude, the prices here are:</h3>
      <ul>
        <li>{`DVDs:  ${priceData.dvds}`}</li>
        <li>{`Hot Sauce:  ${priceData.hotSauce}`}</li>
        <li>{`Switchblades:  ${priceData.switchblades}`}</li>
        <li>{`Fake Shoes:  ${priceData.fakeShoes}`}</li>
        <li>{`Cell Phones:  ${priceData.cellPhones}`}</li>
        <li>{`Massage Chairs:  ${priceData.massageChairs}`}</li>
      </ul>
    </div>
  );
};

export default memo(Prices);
