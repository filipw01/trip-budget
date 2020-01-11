import { ActionTypes } from "../actions/index";
import { Reducer } from "react";
import { tripsReducerArguments, Store } from "../types";
import { Trip } from "../../../functions/src/generalTypes";

const trips: Reducer<any, tripsReducerArguments> = (
  state: Store = {
    trips: [],
    categories: [],
    expenses: [],
    tripsLoading: false,
    creatingTrip: false,
    updatingTrip: false,
    creatingExpense: false,
    deletingTrip: { isDeleting: false, name: "" }
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
    case ActionTypes.UPDATE_TRIP_REQUESTED:
      return { ...state, updatingTrip: true };
    case ActionTypes.UPDATE_TRIP_SUCCEEDED:
      return {
        ...state,
        trips: state.trips.map(trip =>
          trip.id === payload.id
            ? {
                id: trip.id,
                name: payload.name,
                startDate: payload.startDate,
                endDate: payload.endDate,
                town: payload.town
              }
            : trip
        ),
        updatingTrip: false
      };
    case ActionTypes.UPDATE_TRIP_FAILED:
      return { ...state, errorMessage: payload, updatingTrip: false };
    case ActionTypes.DELETE_TRIP_REQUESTED:
      return {
        ...state,
        deletingTrip: { isDeleting: true, name: payload }
      };
    case ActionTypes.DELETE_TRIP_SUCCEEDED:
      return {
        ...state,
        trips: state.trips.filter((trip: Trip) => {
          return trip.id !== payload.id;
        }),
        deletingTrip: {
          isDeleting: false,
          name: ""
        }
      };
    case ActionTypes.DELETE_TRIP_FAILED:
      return {
        ...state,
        errorMessage: payload,
        deletingTrip: {
          isDeleting: false,
          name: ""
        }
      };
    case ActionTypes.CREATE_EXPENSE_REQUESTED:
      return { ...state, creatingExpense: true };
    case ActionTypes.CREATE_EXPENSE_SUCCEEDED:
      return {
        ...state,
        expenses: [...state.expenses, payload],
        creatingExpense: false
      };
    case ActionTypes.CREATE_EXPENSE_FAILED:
      return { ...state, errorMessage: payload, creatingExpense: false };

    case ActionTypes.DELETE_EXPENSE_REQUESTED:
      return state;
    case ActionTypes.DELETE_EXPENSE_SUCCEEDED:
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense.id !== payload.id),
        creatingExpense: false
      };
    case ActionTypes.DELETE_EXPENSE_FAILED:
      return { ...state, errorMessage: payload };
    case ActionTypes.GET_CATEGORIES_REQUESTED:
      return state;
    case ActionTypes.GET_CATEGORIES_SUCCEEDED:
      return {
        ...state,
        categories: payload
      };
    case ActionTypes.GET_CATEGORIES_FAILED:
      return { ...state, errorMessage: payload };
    case ActionTypes.GET_EXPENSES_REQUESTED:
      return state;
    case ActionTypes.GET_EXPENSES_SUCCEEDED:
      return {
        ...state,
        expenses: payload
      };
    case ActionTypes.GET_EXPENSES_FAILED:
      return { ...state, errorMessage: payload };
    default:
      return state;
  }
};
export default trips;
