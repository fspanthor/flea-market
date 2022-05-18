import { memo } from "react";
import { PricesStateType } from "../../../redux/slices/fleaMarketSlice";
import styled from "styled-components";

interface priceDataType {
  priceData: PricesStateType;
}

const StyledPrices = styled.span`
  display: block;
  marker: none;
`;

const StyledUl = styled.ul`
  position: relative;
  bottom: 10px;
  list-style-type: none;
`;

const StyledH3 = styled.h3`
  font-size: 30px;
  margin: 5px;
`;

const Prices = ({ priceData }: priceDataType) => {
  return (
    <StyledPrices>
      <StyledH3>Hey dude, the prices here are:</StyledH3>
      <StyledUl>
        <li>{`DVDs:  ${priceData.dvds}`}</li>
        <li>{`Hot Sauce:  ${priceData.hotSauce}`}</li>
        <li>{`Switchblades:  ${priceData.switchblades}`}</li>
        <li>{`Fake Shoes:  ${priceData.fakeShoes}`}</li>
        <li>{`Cell Phones:  ${priceData.cellPhones}`}</li>
        <li>{`Massage Chairs:  ${priceData.massageChairs}`}</li>
      </StyledUl>
    </StyledPrices>
  );
};

export default memo(Prices);
