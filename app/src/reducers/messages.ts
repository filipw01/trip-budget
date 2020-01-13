import { ActionTypes } from "../actions/index";
import { Reducer } from "react";
import { ReducerArguments } from "../types";
import { defaultStore } from "./index";
import { Message } from "../../../functions/src/generalTypes";
import { generateId } from "../helpers";

const messagesReducer: Reducer<any, ReducerArguments> = (
  messages: Array<Message> = defaultStore.messages,
  { type, payload }
): Array<Message> => {
  switch (type) {
    case ActionTypes.SHOW_MESSAGE:
      return [...messages, { ...payload, id: generateId() }];
    case ActionTypes.HIDE_MESSAGE:
      return messages.filter(message => message.id !== payload);
    default:
      return messages;
  }
};
export default messagesReducer;
