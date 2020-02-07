import { Reducer } from "react";
import { ReducerArguments } from "../types";
import { generateId } from "../helpers";
import { ActionTypes, defaultStore } from "./index";
import { Message } from "../../../functions/src/generalTypes";

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

export const showMessage = (payload: Message) => {
  return {
    type: ActionTypes.SHOW_MESSAGE,
    payload
  };
};
export const dismissMessage = (payload: Message) => {
  return {
    type: ActionTypes.HIDE_MESSAGE,
    payload
  };
};
