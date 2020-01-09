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
  name: string;
  startDate: string;
  endDate: string;
  town: string;
  expenses: Array<ExpenseCategory>;
}
export interface Store {
  tripsLoading: boolean;
  creatingTrip: boolean;
  creatingExpense: boolean;
  deletingTrip: {
    isDeleting: boolean;
    name: string;
  };
  trips: Array<Trip>;
  errorMessage?: string;
}

export interface tripsReducerArguments {
  type: ActionTypes;
  payload: any;
}
