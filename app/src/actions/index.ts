import { Dispatch } from "react";
import firebase from "firebase/app";

export enum ActionTypes {
  CREATE_TRIP_REQUESTED = "CREATE_TRIP_REQUESTED",
  CREATE_TRIP_FAILED = "CREATE_TRIP_FAILED",
  CREATE_TRIP_SUCCEEDED = "CREATE_TRIP_SUCCEEDED",
  DELETE_TRIP_REQUESTED = "DELETE_TRIP_REQUESTED",
  DELETE_TRIP_FAILED = "DELETE_TRIP_FAILED",
  DELETE_TRIP_SUCCEEDED = "DELETE_TRIP_SUCCEEDED",
  GET_TRIPS_REQUESTED = "GET_TRIPS_REQUESTED",
  GET_TRIPS_FAILED = "GET_TRIPS_FAILED",
  GET_TRIPS_SUCCEEDED = "GET_TRIPS_SUCCEEDED"
}

export const getTrips = (payload: any) => async (dispatch: Dispatch<any>) => {
  let idToken;
  try {
    idToken = await firebase?.auth()?.currentUser?.getIdToken();
  } catch (error) {
    console.error(error);
  }
  dispatch({
    type: ActionTypes.GET_TRIPS_REQUESTED
  });
  try {
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
      type: ActionTypes.GET_TRIPS_SUCCEEDED,
      payload: await data.json()
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.GET_TRIPS_FAILED,
      payload: `Couldn't load the trips: ${error}`
    });
  }
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
  dispatch({
    type: ActionTypes.DELETE_TRIP_REQUESTED
  });
  try {
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
      type: ActionTypes.DELETE_TRIP_SUCCEEDED,
      payload: tripName
    });
  } catch {
    dispatch({
      type: ActionTypes.DELETE_TRIP_FAILED,
      payload: `Couldn't delete ${tripName} trip`
    });
  }
};
export const createTrip = (payload: any) => async (dispatch: Dispatch<any>) => {
  let idToken;
  const { tripName, dateStart, dateEnd, town } = payload;
  try {
    idToken = await firebase?.auth()?.currentUser?.getIdToken();
  } catch (error) {
    console.error(error);
  }
  dispatch({
    type: ActionTypes.CREATE_TRIP_REQUESTED
  });
  try {
    await fetch(
      "https://us-central1-trip-budget-27472.cloudfunctions.net/app/createTrip",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`
        },
        mode: "cors",
        method: "PUT",
        body: JSON.stringify({
          tripName,
          dateStart,
          dateEnd,
          town,
          expenses: [
            { name: "accommodations" },
            { name: "food" },
            { name: "travel" }
          ]
        })
      }
    );
    dispatch({
      type: ActionTypes.CREATE_TRIP_SUCCEEDED,
      payload: {
        ...payload,
        expenses: [
          { name: "accommodations" },
          { name: "food" },
          { name: "travel" }
        ]
      }
    });
  } catch {
    dispatch({
      type: ActionTypes.CREATE_TRIP_FAILED,
      payload: `Couldn't create ${tripName} trip`
    });
  }
};
