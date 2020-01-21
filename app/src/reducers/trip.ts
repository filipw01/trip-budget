import { ActionTypes } from "../actions/index";
import { Reducer } from "react";
import { ReducerArguments } from "../types";
import { defaultStore } from "./index";
import { Trip } from "../../../functions/src/generalTypes";

const tripsReducer: Reducer<any, ReducerArguments> = (
  trips: Array<Trip> = defaultStore.trips,
  { type, payload }
): Array<Trip> => {
  switch (type) {
    case ActionTypes.GET_TRIPS_REQUESTED:
      return trips;
    case ActionTypes.GET_TRIPS_SUCCEEDED:
      return payload;
    case ActionTypes.MORE_TRIPS_REQUESTED:
      return trips;
    case ActionTypes.MORE_TRIPS_SUCCEEDED:
      return [...trips, ...payload];
    case ActionTypes.CREATE_TRIP_REQUESTED:
      return trips;
    case ActionTypes.CREATE_TRIP_SUCCEEDED:
      return [...trips, payload];
    case ActionTypes.UPDATE_TRIP_REQUESTED:
      return trips;
    case ActionTypes.UPDATE_TRIP_SUCCEEDED:
      return trips.map(trip =>
        trip.id === payload.id
          ? {
              id: trip.id,
              name: payload.name,
              startDate: payload.startDate,
              endDate: payload.endDate,
              town: payload.town,
              backgroundUrl: payload.backgroundUrl
            }
          : trip
      );
    case ActionTypes.DELETE_TRIP_REQUESTED:
      return trips;
    case ActionTypes.DELETE_TRIP_SUCCEEDED:
      return trips.filter(trip => {
        return trip.id !== payload.id;
      });
    default:
      return trips;
  }
};
export default tripsReducer;
