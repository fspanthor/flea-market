import { memo } from "react";
import { StashStateType } from "../../../redux/slices/fleaMarketSlice";
import styled from "styled-components";

interface stashDataType {
  stashData: StashStateType;
}

const StyledStash = styled.span`
  display: inline-block;
  position: relative;
  bottom 43px;
`;

const StyledBankDebt = styled.div`
  position: relative;
  top: 20px;
  color: darksalmon;
`;

const StyledUl = styled.ul`
  margin: 10px;
`;

const StyledH3 = styled.h3`
  position: relative;
  top: 18px;
  font-size: 20px;
`;

const Stash = ({ stashData }: stashDataType) => {
  return (
    <StyledStash>
      <StyledH3>Stash</StyledH3>
      <StyledUl>
        <li>{`DVDs:  ${stashData.dvds}`}</li>
        <li>{`Hot Sauce:  ${stashData.hotSauce}`}</li>
        <li>{`Switchblades:  ${stashData.switchblades}`}</li>
        <li>{`Fake Shoes:  ${stashData.fakeShoes}`}</li>
        <li>{`Cell Phones:  ${stashData.cellPhones}`}</li>
        <li>{`Massage Chairs:  ${stashData.massageChairs}`}</li>
        <StyledBankDebt>
          <li>{`Bank:  ${stashData.bank}`}</li>
          <li>{`Debt:  ${stashData.debt}`}</li>
        </StyledBankDebt>
      </StyledUl>
    </StyledStash>
  );
};

export default memo(Stash);
