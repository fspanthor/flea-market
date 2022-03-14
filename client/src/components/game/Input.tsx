import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useCallback, useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { toCamel } from "../../app/utilities";

interface InputPropsType {
  gameFunction: (key: string) => Promise<any>;
  reduxAction: ActionCreatorWithPayload<string, string>;
}

/**
 *
 * @param param0 gameFunction: function to call on server, reduxAction: action to store function return in redux store
 * @returns void
 */
const Input = ({ gameFunction, reduxAction }: InputPropsType) => {
  const dispatch = useAppDispatch();

  const handleKeyDown = useCallback(
    async (e: KeyboardEvent) => {
      document.body.removeEventListener("keydown", handleKeyDown);
      e.preventDefault();
      e.stopPropagation();
      if (!e.repeat) {
        const gameFunctionReturn = await gameFunction(e.key);
        dispatch(reduxAction(toCamel(gameFunctionReturn)));
      }
    },
    [dispatch, gameFunction, reduxAction]
  );

  useEffect(() => {
    document.body.addEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return null;
};

export default Input;
