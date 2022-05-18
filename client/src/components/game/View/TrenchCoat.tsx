import { memo } from "react";
import styled from "styled-components";
import { TrenchCoatStateType } from "../../../redux/slices/fleaMarketSlice";

interface trenchCoatDataType {
  trenchCoatData: TrenchCoatStateType;
}

const StyledTrenchCoat = styled.span`
  display: inline-block;
  position: relative;
  bottom: 22px;
`;

const StyledUl = styled.ul`
  margin: 10px;
`;

const StyledUtils = styled.div`
  position: relative;
  top: 20px;
  color: darksalmon;
`;

const StyledH3 = styled.h3`
  position: relative;
  top: 18px;
  font-size: 20px;
`;

const TrenchCoat = ({ trenchCoatData }: trenchCoatDataType) => {
  return (
    <StyledTrenchCoat>
      <StyledH3>Trench Coat</StyledH3>
      <StyledUl>
        <li>{`DVDs:  ${trenchCoatData.dvds}`}</li>
        <li>{`Hot Sauce:  ${trenchCoatData.hotSauce}`}</li>
        <li>{`Switchblades:  ${trenchCoatData.switchblades}`}</li>
        <li>{`Fake Shoes:  ${trenchCoatData.fakeShoes}`}</li>
        <li>{`Cell Phones:  ${trenchCoatData.cellPhones}`}</li>
        <li>{`Massage Chairs:  ${trenchCoatData.massageChairs}`}</li>
        <StyledUtils>
          <li>{`Corn Dogs:  ${trenchCoatData.cornDogs}`}</li>
          <li>{`Cash:  ${trenchCoatData.cash}`}</li>
          <li>{`Max Hold:  ${trenchCoatData.maxHold}`}</li>
        </StyledUtils>
      </StyledUl>
    </StyledTrenchCoat>
  );
};
export default memo(TrenchCoat);
