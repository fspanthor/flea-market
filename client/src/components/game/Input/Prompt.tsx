import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import Input from "../Common/Input";

interface PromptDataType {
  promptText: string;
  promptFunction: (key: string) => Promise<any>;
  promptReduxAction: ActionCreatorWithPayload<any>;
  allowableKeys?: string[];
}

const Prompt = ({
  promptText,
  promptFunction,
  promptReduxAction,
  allowableKeys,
}: PromptDataType) => {
  return (
    <div>
      {promptText}
      <Input
        gameFunction={promptFunction}
        reduxAction={promptReduxAction}
        allowableKeys={allowableKeys ? allowableKeys : undefined}
      />
    </div>
  );
};
export default Prompt;
