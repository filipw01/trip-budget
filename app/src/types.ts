import { ActionTypes } from "./actions";
import {
  Expense,
  Category,
  Trip
} from "../../functions/src/generalTypes";
export interface Store {
  tripsLoading: boolean;
  creatingTrip: boolean;
  creatingExpense: boolean;
  updatingTrip: boolean;
  deletingTrip: {
    isDeleting: boolean;
    name: string;
  };
  expenses: Array<Expense>;
  categories: Array<Category>;
  trips: Array<Trip>;
  errorMessage?: string;
}

export interface tripsReducerArguments {
  type: ActionTypes;
  payload: any;
}
