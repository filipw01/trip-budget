import { Dispatch } from "react";
import { baseUrl } from "../config";
import { ActionTypes, getApiHeaders } from "./index";
import {
  CreateTripBody,
  UpdateTripBody,
  DeleteTripBody,
  Trip
} from "../../../functions/src/generalTypes";

export interface moreTripsArguments {
  offset: number;
}

export const moreTrips = (payload: moreTripsArguments) => async (
  dispatch: Dispatch<any>
) => {
  const { offset } = payload;
  dispatch({
    type: ActionTypes.MORE_TRIPS_REQUESTED
  });
  try {
    const data = await fetch(`${baseUrl}/trip/more?offset=${offset}`, {
      ...(await getApiHeaders()),
      method: "GET"
    });
    const trips = await data.json();
    dispatch({
      type: ActionTypes.MORE_TRIPS_SUCCEEDED,
      payload: trips
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.SHOW_MESSAGE,
      payload: { type: "error", content: `Couldn't load the trips: ${error}` }
    });
  }
};
export const getTrips = () => async (dispatch: Dispatch<any>) => {
  dispatch({
    type: ActionTypes.GET_TRIPS_REQUESTED
  });
  try {
    const data = await fetch(`${baseUrl}/trip`, {
      ...(await getApiHeaders()),
      method: "GET"
    });
    const aggregated = await data.json();
    dispatch({
      type: ActionTypes.GET_TRIPS_SUCCEEDED,
      payload: aggregated.trips
    });
    dispatch(openTrip(aggregated.trips[0]));
  } catch (error) {
    dispatch({
      type: ActionTypes.SHOW_MESSAGE,
      payload: { type: "error", content: `Couldn't load the trips: ${error}` }
    });
  }
};
export const createTrip = (payload: CreateTripBody) => async (
  dispatch: Dispatch<any>
) => {
  const { name } = payload;
  dispatch({
    type: ActionTypes.CREATE_TRIP_REQUESTED
  });
  try {
    const response = await fetch(`${baseUrl}/trip`, {
      ...(await getApiHeaders()),
      method: "PUT",
      body: JSON.stringify(payload)
    });
    const jsonResponse = await response.json();
    const { id } = jsonResponse;
    dispatch({
      type: ActionTypes.CREATE_TRIP_SUCCEEDED,
      payload: {
        id,
        ...payload
      }
    });
    dispatch({
      type: ActionTypes.SHOW_MESSAGE,
      payload: { type: "success", content: `Created trip: ${payload.name}` }
    });
  } catch (e) {
    dispatch({
      type: ActionTypes.SHOW_MESSAGE,
      payload: { type: "error", content: `Couldn't create ${name} trip ${e}` }
    });
  }
};
export const updateTrip = (payload: UpdateTripBody) => async (
  dispatch: Dispatch<any>
) => {
  dispatch({
    type: ActionTypes.UPDATE_TRIP_REQUESTED
  });
  try {
    await fetch(`${baseUrl}/trip`, {
      ...(await getApiHeaders()),
      method: "PATCH",
      body: JSON.stringify(payload)
    });
    dispatch({
      type: ActionTypes.UPDATE_TRIP_SUCCEEDED,
      payload
    });
    dispatch({
      type: ActionTypes.SHOW_MESSAGE,
      payload: { type: "success", content: `Created trip: ${payload.name}` }
    });
  } catch {
    dispatch({
      type: ActionTypes.SHOW_MESSAGE,
      payload: { type: "error", content: `Couldn't update ${payload.id} trip` }
    });
  }
};
export const deleteTrip = (payload: DeleteTripBody) => async (
  dispatch: Dispatch<any>
) => {
  const { id } = payload;
  dispatch({
    type: ActionTypes.DELETE_TRIP_REQUESTED
  });
  try {
    await fetch(`${baseUrl}/trip`, {
      ...(await getApiHeaders()),
      method: "DELETE",
      body: JSON.stringify(payload)
    });
    dispatch({
      type: ActionTypes.DELETE_TRIP_SUCCEEDED,
      payload
    });
    dispatch({
      type: ActionTypes.SHOW_MESSAGE,
      payload: { type: "info", content: `Got ${id} trip` }
    });
  } catch {
    dispatch({
      type: ActionTypes.SHOW_MESSAGE,
      payload: { type: "error", content: `Couldn't delete ${id} trip` }
    });
  }
};
export const openTrip = (payload: Trip) => {
  return { type: ActionTypes.OPEN_TRIP, payload };
};
