import { Dispatch } from "react";
import firebase from "firebase/app";
import { baseUrl } from "../config";

export enum ActionTypes {
  CREATE_TRIP_REQUESTED = "CREATE_TRIP_REQUESTED",
  CREATE_TRIP_FAILED = "CREATE_TRIP_FAILED",
  CREATE_TRIP_SUCCEEDED = "CREATE_TRIP_SUCCEEDED",
  DELETE_TRIP_REQUESTED = "DELETE_TRIP_REQUESTED",
  DELETE_TRIP_FAILED = "DELETE_TRIP_FAILED",
  DELETE_TRIP_SUCCEEDED = "DELETE_TRIP_SUCCEEDED",
  GET_TRIPS_REQUESTED = "GET_TRIPS_REQUESTED",
  GET_TRIPS_FAILED = "GET_TRIPS_FAILED",
  GET_TRIPS_SUCCEEDED = "GET_TRIPS_SUCCEEDED",
  CREATE_EXPENSE_REQUESTED = "CREATE_EXPENSE_REQUESTED",
  CREATE_EXPENSE_FAILED = "CREATE_EXPENSE_FAILED",
  CREATE_EXPENSE_SUCCEEDED = "CREATE_EXPENSE_SUCCEEDED",
  DELETE_EXPENSE_REQUESTED = "DELETE_EXPENSE_REQUESTED",
  DELETE_EXPENSE_FAILED = "DELETE_EXPENSE_FAILED",
  DELETE_EXPENSE_SUCCEEDED = "DELETE_EXPENSE_SUCCEEDED"
}

async function getToken() {
  try {
    return firebase?.auth()?.currentUser?.getIdToken();
  } catch (error) {
    console.error(error);
  }
}

const getApiHeaders = async () => ({
  mode: "cors" as "cors",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${await getToken()}`
  }
});

export const getTrips = () => async (dispatch: Dispatch<any>) => {
  dispatch({
    type: ActionTypes.GET_TRIPS_REQUESTED
  });
  try {
    const data = await fetch(`${baseUrl}/getTrips`, {
      ...(await getApiHeaders()),
      method: "GET"
    });
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
  dispatch({
    type: ActionTypes.DELETE_TRIP_REQUESTED
  });
  try {
    await fetch(`${baseUrl}/deleteTrip`, {
      ...(await getApiHeaders()),
      method: "DELETE",
      body: JSON.stringify({
        tripName
      })
    });
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
  const { tripName, dateStart, dateEnd, town } = payload;
  dispatch({
    type: ActionTypes.CREATE_TRIP_REQUESTED
  });
  try {
    await fetch(`${baseUrl}/createTrip`, {
      ...(await getApiHeaders()),
      method: "PUT",
      body: JSON.stringify({
        tripName,
        dateStart,
        dateEnd,
        town,
        expenses: [
          { name: "accommodations", values: [] },
          { name: "food", values: [] },
          { name: "travel", values: [] }
        ]
      })
    });
    dispatch({
      type: ActionTypes.CREATE_TRIP_SUCCEEDED,
      payload: {
        ...payload,
        expenses: [
          { name: "accommodations", values: [] },
          { name: "food", values: [] },
          { name: "travel", values: [] }
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
export const createExpense = (payload: any) => async (
  dispatch: Dispatch<any>
) => {
  const { tripName, date, title, description, price, category } = payload;
  dispatch({
    type: ActionTypes.CREATE_EXPENSE_REQUESTED
  });
  try {
    await fetch(`${baseUrl}/createExpense`, {
      ...(await getApiHeaders()),
      method: "PUT",
      body: JSON.stringify({
        tripName,
        date,
        title,
        description,
        price,
        category
      })
    });
    dispatch({
      type: ActionTypes.CREATE_EXPENSE_SUCCEEDED,
      payload: {
        tripName,
        date,
        title,
        description,
        price,
        category
      }
    });
  } catch {
    dispatch({
      type: ActionTypes.CREATE_EXPENSE_FAILED,
      payload: `Couldn't create ${title} trip`
    });
  }
};

export const deleteExpense = (payload: any) => async (
  dispatch: Dispatch<any>
) => {
  const { tripName, category, expenseName } = payload;
  dispatch({
    type: ActionTypes.DELETE_EXPENSE_REQUESTED
  });
  try {
    await fetch(`${baseUrl}/deleteExpense`, {
      ...(await getApiHeaders()),
      method: "DELETE",
      body: JSON.stringify({
        tripName,
        category,
        expenseName
      })
    });
    dispatch({
      type: ActionTypes.DELETE_EXPENSE_SUCCEEDED,
      payload: { tripName, category, expenseName }
    });
  } catch {
    dispatch({
      type: ActionTypes.DELETE_EXPENSE_FAILED,
      payload: `Couldn't delete ${expenseName} expense in ${tripName} trip`
    });
  }
};
