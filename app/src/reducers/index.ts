import { ActionTypes } from "../actions/index";
import { Reducer } from "react";

interface tripsReducerArguments {
  type: ActionTypes;
  payload: any;
}

const trips: Reducer<any, tripsReducerArguments> = (
  state = { trips: [] },
  { type, payload }
): Array<any> => {
  switch (type) {
    case ActionTypes.START_LOADING_TRIPS:
      return { ...state, tripsLoading: true };
    case ActionTypes.GET_TRIPS:
      return { ...state, trips: payload, tripsLoading: false };
    case ActionTypes.ADD_TRIP:
      return { ...state, trips: [...state.trips, payload] };
    case ActionTypes.DELETE_TRIP:
      return {
        ...state,
        trips: state.trips.filter((trip: any) => {
          return trip.tripName !== payload;
        })
      };
    default:
      return state;
  }
};
export default trips;
