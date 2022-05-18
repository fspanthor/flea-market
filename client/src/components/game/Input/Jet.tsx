import { memo } from "react";
import styled from "styled-components";
import { FleaMarketFunction } from "../../../app/constants";
import { setLocationResponse } from "../../../redux/slices/fleaMarketSlice";
import { GreyText } from "../../../styles/commonStyles";
import { sendFunctionRequest } from "../../service/functionRequest";
import Input from "../Common/Input";

export const jetPrompt = async (key: string) => {
  return await sendFunctionRequest({
    function: FleaMarketFunction.CHANGE_LOCATION,
    params: { key: key },
  });
};

const StyledLocationDiv = styled.span`
  display: inline-block;
  text-align: left;
  font-size: 15px;
  margin-left: 30px;
  margin-right: 30px;
`;

const jetAllowableKeys = ["1", "2", "3", "4", "5", "6"];

const Jet = () => {
  return (
    <div>
      <GreyText>WHERE TO DUDE:</GreyText>
      <ul>
        <StyledLocationDiv>
          <li>(1) FLORIDA</li>
          <li>(2) ASHBY BART FLEA MARKET</li>
        </StyledLocationDiv>
        <StyledLocationDiv>
          <li>(3) SAN JOSE SUPER MALL</li>
          <li>(4) SOLANO SWAP MEET</li>
        </StyledLocationDiv>
        <StyledLocationDiv>
          <li>(5) COMMUNITY COLLEGE FLEA MARKET</li>
          <li>(6) HAUNTED MALL</li>
        </StyledLocationDiv>
      </ul>
      <Input
        gameFunction={jetPrompt}
        reduxAction={setLocationResponse}
        allowableKeys={jetAllowableKeys}
      />
    </div>
  );
};

export default memo(Jet);
