import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { toCamel } from "../../app/utilities";
import { setGameState } from "../../redux/slices/fleaMarketSlice";

interface InputPropsType {
  gameFunction: (key: string) => Promise<any>;
}

const Input = ({ gameFunction }: InputPropsType) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    document.body.addEventListener("keydown", (e) => handleKeyDown(e));
    const handleKeyDown = async (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!e.repeat) {
        const gameFunctionReturn = await gameFunction(e.key);
        dispatch(setGameState(toCamel(gameFunctionReturn)));
      }
    };
  }, [dispatch, gameFunction]);

  return <div>input component</div>;
};

export default Input;
