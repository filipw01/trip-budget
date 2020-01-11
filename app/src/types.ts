import { ActionTypes } from "./actions";
import {
  Expense,
  Category,
  Trip,
  Message
} from "../../functions/src/generalTypes";
export interface Store {
  loading: boolean;
  expenses: Array<Expense>;
  categories: Array<Category>;
  trips: Array<Trip>;
  messages: Array<Message>;
}

export interface ReducerArguments {
  type: ActionTypes;
  payload: any;
}
