import { Dispatch } from "react";
import firebase from "firebase/app";

export enum ActionTypes {
  ADD_TRIP = "ADD_TRIP",
  DELETE_TRIP = "DELETE_TRIP",
  GET_TRIPS = "GET_TRIPS",
  START_LOADING_TRIPS = "START_LOADING_TRIPS"
}

export const addTrip = (payload: any) => ({
  type: ActionTypes.ADD_TRIP,
  payload
});
export const getTrips = (payload: any) => async (dispatch: Dispatch<any>) => {
  let idToken;
  try {
    idToken = await firebase?.auth()?.currentUser?.getIdToken();
  } catch (error) {
    console.error(error);
  }
  dispatch({
    type: ActionTypes.START_LOADING_TRIPS
  });
  const data = await fetch(
    "https://us-central1-trip-budget-27472.cloudfunctions.net/app/getTrips",
    {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`
      },
      method: "GET"
    }
  );
  dispatch({
    type: ActionTypes.GET_TRIPS,
    payload: await data.json()
  });
};
export const deleteTrip = (tripName: string) => async (
  dispatch: Dispatch<any>
) => {
  let idToken;
  try {
    idToken = await firebase?.auth()?.currentUser?.getIdToken();
  } catch (error) {
    console.error(error);
  }
  await fetch(
    "https://us-central1-trip-budget-27472.cloudfunctions.net/app/deleteTrip",
    {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`
      },
      method: "DELETE",
      body: JSON.stringify({
        tripName
      })
    }
  );
  dispatch({
    type: ActionTypes.DELETE_TRIP,
    payload: tripName
  });
};
export const createTrip = (payload: any) => async (dispatch: Dispatch<any>) => {
  let idToken;
  const { tripName, dateStart, dateEnd, town } = payload;
  try {
    idToken = await firebase?.auth()?.currentUser?.getIdToken();
  } catch (error) {
    console.error(error);
  }
  await fetch(
    "https://us-central1-trip-budget-27472.cloudfunctions.net/app/createTrip",
    {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`
      },
      method: "PUT",
      body: JSON.stringify({
        tripName,
        dateStart,
        dateEnd,
        town
      })
    }
  );
  dispatch(addTrip(payload));
};
