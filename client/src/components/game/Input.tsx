import { useCallback, useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { toCamel } from "../../app/utilities";
import { setGameState } from "../../redux/slices/fleaMarketSlice";

interface InputPropsType {
  gameFunction: (key: string) => Promise<any>;
}

const Input = ({ gameFunction }: InputPropsType) => {
  const dispatch = useAppDispatch();

  const handleKeyDown = useCallback(
    async (e: KeyboardEvent) => {
      document.body.removeEventListener("keydown", handleKeyDown);
      e.preventDefault();
      e.stopPropagation();
      if (!e.repeat) {
        const gameFunctionReturn = await gameFunction(e.key);
        dispatch(setGameState(toCamel(gameFunctionReturn)));
      }
    },
    [dispatch, gameFunction]
  );

  useEffect(() => {
    document.body.addEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return null;
};

export default Input;
