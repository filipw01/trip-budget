import { ActionTypes } from "../actions/index";
import { Reducer } from "react";

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
interface tripsReducerArguments {
  type: ActionTypes;
  payload: any;
}

const trips: Reducer<any, tripsReducerArguments> = (
  state = {
    trips: [],
    tripsLoading: false,
    creatingTrip: false,
    creatingExpense: false,
    deletingTrip: { isDeleting: false }
  },
  { type, payload }
): Store => {
  switch (type) {
    case ActionTypes.GET_TRIPS_REQUESTED:
      return { ...state, tripsLoading: true };
    case ActionTypes.GET_TRIPS_SUCCEEDED:
      return { ...state, trips: payload, tripsLoading: false };
    case ActionTypes.GET_TRIPS_FAILED:
      return { ...state, errorMessage: payload, tripsLoading: false };
    case ActionTypes.CREATE_TRIP_REQUESTED:
      return { ...state, creatingTrip: true };
    case ActionTypes.CREATE_TRIP_SUCCEEDED:
      return {
        ...state,
        trips: [...state.trips, payload],
        creatingTrip: false
      };
    case ActionTypes.CREATE_TRIP_FAILED:
      return { ...state, errorMessage: payload, creatingTrip: false };
    case ActionTypes.DELETE_TRIP_REQUESTED:
      return {
        ...state,
        deletingTrip: { isDeleting: true, tripName: payload }
      };
    case ActionTypes.DELETE_TRIP_SUCCEEDED:
      return {
        ...state,
        trips: state.trips.filter((trip: any) => {
          return trip.tripName !== payload;
        }),
        deletingTrip: {
          isDeleting: false
        }
      };
    case ActionTypes.DELETE_TRIP_FAILED:
      return {
        ...state,
        errorMessage: payload,
        deletingTrip: {
          isDeleting: false
        }
      };
    case ActionTypes.CREATE_EXPENSE_REQUESTED:
      return { ...state, creatingExpense: true };
    case ActionTypes.CREATE_EXPENSE_SUCCEEDED:
      return {
        ...state,
        trips: state.trips.map((trip: Trip) =>
          trip.tripName === payload.tripName
            ? {
                ...trip,
                expenses: [
                  ...trip.expenses.map((expense: ExpenseCategory) =>
                    payload.category === expense.name
                      ? {
                          ...expense,
                          values: [...expense.values, payload]
                        }
                      : expense
                  )
                ]
              }
            : trip
        ),
        creatingExpense: false
      };
    case ActionTypes.CREATE_EXPENSE_FAILED:
      return { ...state, errorMessage: payload, creatingExpense: false };
    case ActionTypes.DELETE_EXPENSE_REQUESTED:
      return state;
    case ActionTypes.DELETE_EXPENSE_SUCCEEDED:
      return {
        ...state,
        trips: state.trips.map((trip: Trip) =>
          trip.tripName === payload.tripName
            ? {
                ...trip,
                expenses: [
                  ...trip.expenses.map((expenseCategory: ExpenseCategory) =>
                    payload.category === expenseCategory.name
                      ? {
                          ...expenseCategory,
                          values: expenseCategory.values.filter(
                            (expense: Expense) =>
                              expense.title !== payload.expenseName
                          )
                        }
                      : expenseCategory
                  )
                ]
              }
            : trip
        ),
        creatingExpense: false
      };
    case ActionTypes.DELETE_EXPENSE_FAILED:
      return { ...state, errorMessage: payload };
    default:
      return state;
  }
};
export default trips;
