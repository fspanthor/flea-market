import { StashStateType } from "../../../redux/slices/fleaMarketSlice";

interface stashDataType {
  stashData: StashStateType;
}

const Stash = ({ stashData }: stashDataType) => {
  return (
    <div>
      <h3>Stash:</h3>
      <ul>
        <li>{`Golf Carts:  ${stashData.golfCarts}`}</li>
        <li>{`Cell Phones:  ${stashData.cellPhones}`}</li>
        <li>{`Switchblades:  ${stashData.switchblades}`}</li>
        <li>{`Hot Sauce:  ${stashData.hotSauce}`}</li>
        <li>{`DVDs:  ${stashData.dvds}`}</li>
        <li>{`Fake Shoes:  ${stashData.fakeShoes}`}</li>
        <li>{`Bank:  ${stashData.bank}`}</li>
        <li>{`Debt:  ${stashData.debt}`}</li>
      </ul>
    </div>
  );
};

export default Stash;
