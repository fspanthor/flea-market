import { memo } from "react";
import { StashStateType } from "../../../redux/slices/fleaMarketSlice";

interface stashDataType {
  stashData: StashStateType;
}

const Stash = ({ stashData }: stashDataType) => {
  return (
    <div>
      <h3>Stash:</h3>
      <ul>
        <li>{`DVDs:  ${stashData.dvds}`}</li>
        <li>{`Hot Sauce:  ${stashData.hotSauce}`}</li>
        <li>{`Switchblades:  ${stashData.switchblades}`}</li>
        <li>{`Fake Shoes:  ${stashData.fakeShoes}`}</li>
        <li>{`Cell Phones:  ${stashData.cellPhones}`}</li>
        <li>{`Massage Chairs:  ${stashData.massageChairs}`}</li>
        <li>{`Bank:  ${stashData.bank}`}</li>
        <li>{`Debt:  ${stashData.debt}`}</li>
      </ul>
    </div>
  );
};

export default memo(Stash);
