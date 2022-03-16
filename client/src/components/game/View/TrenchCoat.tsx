import { TrenchCoatStateType } from "../../../redux/slices/fleaMarketSlice";

interface trenchCoatDataType {
  trenchCoatData: TrenchCoatStateType;
}

const TrenchCoat = ({ trenchCoatData }: trenchCoatDataType) => {
  return (
    <div>
      <h3>Trench Coat:</h3>
      <ul>
        <li>{`Golf Carts:  ${trenchCoatData.golfCarts}`}</li>
        <li>{`Cell Phones:  ${trenchCoatData.cellPhones}`}</li>
        <li>{`Switchblades:  ${trenchCoatData.switchblades}`}</li>
        <li>{`Hot Sauce:  ${trenchCoatData.hotSauce}`}</li>
        <li>{`DVDs:  ${trenchCoatData.dvds}`}</li>
        <li>{`Fake Shoes:  ${trenchCoatData.fakeShoes}`}</li>
        <li>{`Corn Dogs:  ${trenchCoatData.cornDogs}`}</li>
        <li>{`Cash:  ${trenchCoatData.cash}`}</li>
        <li>{`Max Hold:  ${trenchCoatData.maxHold}`}</li>
      </ul>
    </div>
  );
};
export default TrenchCoat;
