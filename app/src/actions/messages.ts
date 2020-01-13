import { ActionTypes } from "./index";
import { Message } from "../../../functions/src/generalTypes";

export const dismissMessage = (payload: Message) => {
  return {
    type: ActionTypes.HIDE_MESSAGE,
    payload
  };
};
