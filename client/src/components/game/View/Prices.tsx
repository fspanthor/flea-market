import { memo } from "react";
import { PricesStateType } from "../../../redux/slices/fleaMarketSlice";
import styled from "styled-components";

interface priceDataType {
  priceData: PricesStateType;
}

const StyledPrices = styled.span`
  display: block;
`;

const Prices = ({ priceData }: priceDataType) => {
  return (
    <StyledPrices>
      <h3>Hey dude, the prices here are:</h3>
      <ul>
        <li>{`DVDs:  ${priceData.dvds}`}</li>
        <li>{`Hot Sauce:  ${priceData.hotSauce}`}</li>
        <li>{`Switchblades:  ${priceData.switchblades}`}</li>
        <li>{`Fake Shoes:  ${priceData.fakeShoes}`}</li>
        <li>{`Cell Phones:  ${priceData.cellPhones}`}</li>
        <li>{`Massage Chairs:  ${priceData.massageChairs}`}</li>
      </ul>
    </StyledPrices>
  );
};

export default memo(Prices);
