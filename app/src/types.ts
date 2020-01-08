import { ActionTypes } from "./actions";

export interface Expense {
  title: string;
  price: string;
  description: string;
  date: string;
}
export interface ExpenseCategory {
  name: string;
  values: Array<Expense>;
}

export interface Trip {
  tripName: string;
  dateStart: string;
  dateEnd: string;
  town: string;
  expenses: Array<ExpenseCategory>;
}
export interface Store {
  tripsLoading: boolean;
  creatingTrip: boolean;
  creatingExpense: boolean;
  deletingTrip: {
    isDeleting: boolean;
    tripName: string;
  };
  trips: Array<Trip>;
  errorMessage?: string;
}

export interface tripsReducerArguments {
  type: ActionTypes;
  payload: any;
}
