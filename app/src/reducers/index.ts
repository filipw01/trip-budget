import { ActionTypes } from "../actions/index";
import { Reducer } from "react";

export interface Expense{
  title: string;
  description: string;
  date: string;
  value: string;
}
export interface Store {
  tripsLoading: boolean;
  creatingTrip: boolean;
  deletingTrip: {
    isDeleting: boolean;
    tripName: string;
  };
  trips: Array<Object | never>;
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
    default:
      return state;
  }
};
export default trips;
