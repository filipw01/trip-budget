import { ActionTypes } from "../actions/index";
import { Reducer } from "react";
import { ReducerArguments } from "../types";
import { defaultStore } from "./index";
import { Message } from "../../../functions/src/generalTypes";

const messagesReducer: Reducer<any, ReducerArguments> = (
  state: Array<Message> = defaultStore.messages,
  { type, payload }
): Array<Message> => {
  switch (type) {
    case ActionTypes.OPERATION_FAILED:
      return [...state, payload];
    default:
      return state;
  }
};
export default messagesReducer;
