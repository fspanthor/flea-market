import { memo } from "react";
import styled from "styled-components";
import { FleaMarketFunction } from "../../../app/constants";
import { setGameState } from "../../../redux/slices/fleaMarketSlice";
import { sendFunctionRequest } from "../../service/functionRequest";
import Input from "../Common/Input";

export const buySellJetPrompt = async (key: string) => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.BUY_SELL_JET,
    params: { key: key },
  });
};

const StyledBuySellJet = styled.div`
  position: relative;
  bottom: 17px;
  color: grey;
`;

const buySellJetAllowableKeys = ["b", "s", "j", "B", "S", "J"];

const BuySellJet = () => {
  return (
    <StyledBuySellJet>
      <span>WILL YOU (B)UY (S)ELL OR (J)ET?</span>
      <Input
        gameFunction={buySellJetPrompt}
        reduxAction={setGameState}
        allowableKeys={buySellJetAllowableKeys}
      />
    </StyledBuySellJet>
  );
};

export default memo(BuySellJet);
