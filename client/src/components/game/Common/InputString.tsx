import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { memo, useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectCurrentItem } from "../../../redux/slices/fleaMarketSlice";

interface InputStringPropsType {
  gameFunction: (item: string, amount: number) => Promise<any>;
  reduxAction: ActionCreatorWithPayload<any, string>;
  allowableKeys?: string[];
}

const InputString = ({
  gameFunction,
  reduxAction,
  allowableKeys,
}: InputStringPropsType) => {
  const currentItem = useAppSelector(selectCurrentItem);

  const [input, setInput] = useState("");

  const allowableKey = (key: string, allowableKeys: string[]) => {
    if (allowableKeys.find((e) => e === key)) {
      return true;
    }
  };

  const dispatch = useAppDispatch();

  /**
   * @param e - keyboard event
   * event listener will call setInput which will update input state
   * when input state is updated handleKeyDown function will be re created
   * when handleKeyDown function is recreated useEffect will be called again
   * this would add duplicate event listeners unless they were removed after each key stroke
   *
   */
  const handleKeyDown = useCallback(
    async (e: KeyboardEvent) => {
      const numberKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
      if (
        allowableKeys === undefined ||
        allowableKeys.find((allowableKey) => allowableKey === e.key)
      ) {
        e.preventDefault();
        e.stopPropagation();
        if (e.key === "Backspace" && input.length > 0) {
          if (input.length > 0) {
            document.body.removeEventListener("keydown", handleKeyDown);
            setInput((prevState) => {
              return prevState.slice(0, -1);
            });
          }
          return;
        }
        if (allowableKey(e.key, numberKeys) && input.length < 100) {
          document.body.removeEventListener("keydown", handleKeyDown);
          setInput((prevState) => prevState + e.key);
          return;
        }
        if (e.key === "Enter" && input.length > 0) {
          document.body.removeEventListener("keydown", handleKeyDown);
          const gameFunctionReturn = await gameFunction(
            currentItem,
            parseInt(input)
          );
          dispatch(reduxAction(gameFunctionReturn));
          return;
        }
      }
    },
    [allowableKeys, currentItem, dispatch, gameFunction, input, reduxAction]
  );

  useEffect(() => {
    document.body.addEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return <div>{`>${input}`}_</div>;
};
export default memo(InputString);
