import { memo } from "react";
import styled from "styled-components";
import { TrenchCoatStateType } from "../../../redux/slices/fleaMarketSlice";

interface trenchCoatDataType {
  trenchCoatData: TrenchCoatStateType;
}

const StyledTrenchCoat = styled.span`
  display: inline-block;
`;

const TrenchCoat = ({ trenchCoatData }: trenchCoatDataType) => {
  return (
    <StyledTrenchCoat>
      <h3>Trench Coat:</h3>
      <ul>
        <li>{`DVDs:  ${trenchCoatData.dvds}`}</li>
        <li>{`Hot Sauce:  ${trenchCoatData.hotSauce}`}</li>
        <li>{`Switchblades:  ${trenchCoatData.switchblades}`}</li>
        <li>{`Fake Shoes:  ${trenchCoatData.fakeShoes}`}</li>
        <li>{`Cell Phones:  ${trenchCoatData.cellPhones}`}</li>
        <li>{`Massage Chairs:  ${trenchCoatData.massageChairs}`}</li>
        <li>{`Corn Dogs:  ${trenchCoatData.cornDogs}`}</li>
        <li>{`Cash:  ${trenchCoatData.cash}`}</li>
        <li>{`Max Hold:  ${trenchCoatData.maxHold}`}</li>
      </ul>
    </StyledTrenchCoat>
  );
};
export default memo(TrenchCoat);
