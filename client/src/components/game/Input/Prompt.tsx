import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import Input from "../Common/Input";

interface PromptDataType {
  promptText: string;
  promptFunction: (key: string) => Promise<any>;
  promptReduxAction: ActionCreatorWithPayload<any>;
}

const Prompt = ({
  promptText,
  promptFunction,
  promptReduxAction,
}: PromptDataType) => {
  return (
    <div>
      {promptText}
      <Input gameFunction={promptFunction} reduxAction={promptReduxAction} />
    </div>
  );
};
export default Prompt;
