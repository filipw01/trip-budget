import { Dispatch } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { baseUrl } from "../config";
import {
  CreateTripBody,
  UpdateTripBody,
  DeleteTripBody,
  CreateExpenseBody,
  UpdateExpenseBody,
  DeleteExpenseBody
} from "../../../functions/src/generalTypes";

export enum ActionTypes {
  CREATE_TRIP_REQUESTED = "CREATE_TRIP_REQUESTED",
  CREATE_TRIP_FAILED = "CREATE_TRIP_FAILED",
  CREATE_TRIP_SUCCEEDED = "CREATE_TRIP_SUCCEEDED",
  DELETE_TRIP_REQUESTED = "DELETE_TRIP_REQUESTED",
  DELETE_TRIP_FAILED = "DELETE_TRIP_FAILED",
  DELETE_TRIP_SUCCEEDED = "DELETE_TRIP_SUCCEEDED",
  UPDATE_TRIP_REQUESTED = "UPDATE_TRIP_REQUESTED",
  UPDATE_TRIP_FAILED = "UPDATE_TRIP_FAILED",
  UPDATE_TRIP_SUCCEEDED = "UPDATE_TRIP_SUCCEEDED",
  GET_TRIPS_REQUESTED = "GET_TRIPS_REQUESTED",
  GET_TRIPS_FAILED = "GET_TRIPS_FAILED",
  GET_TRIPS_SUCCEEDED = "GET_TRIPS_SUCCEEDED",
  CREATE_EXPENSE_REQUESTED = "CREATE_EXPENSE_REQUESTED",
  CREATE_EXPENSE_FAILED = "CREATE_EXPENSE_FAILED",
  CREATE_EXPENSE_SUCCEEDED = "CREATE_EXPENSE_SUCCEEDED",
  DELETE_EXPENSE_REQUESTED = "DELETE_EXPENSE_REQUESTED",
  DELETE_EXPENSE_FAILED = "DELETE_EXPENSE_FAILED",
  DELETE_EXPENSE_SUCCEEDED = "DELETE_EXPENSE_SUCCEEDED",
  UPDATE_EXPENSE_REQUESTED = "UPDATE_EXPENSE_REQUESTED",
  UPDATE_EXPENSE_FAILED = "UPDATE_EXPENSE_FAILED",
  UPDATE_EXPENSE_SUCCEEDED = "UPDATE_EXPENSE_SUCCEEDED"
}

async function getToken() {
  try {
    return firebase.auth().currentUser?.getIdToken();
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
    const data = await fetch(`${baseUrl}/trip`, {
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
export const createTrip = (payload: CreateTripBody) => async (
  dispatch: Dispatch<any>
) => {
  const { name, startDate, endDate, town } = payload;
  dispatch({
    type: ActionTypes.CREATE_TRIP_REQUESTED
  });
  try {
    await fetch(`${baseUrl}/trip`, {
      ...(await getApiHeaders()),
      method: "PUT",
      body: JSON.stringify({
        name,
        startDate,
        endDate,
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
      payload: `Couldn't create ${name} trip`
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
  } catch {
    dispatch({
      type: ActionTypes.UPDATE_TRIP_FAILED,
      payload: `Couldn't update ${payload.name} trip`
    });
  }
};
export const deleteTrip = (payload: DeleteTripBody) => async (
  dispatch: Dispatch<any>
) => {
  const { name } = payload;
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
  } catch {
    dispatch({
      type: ActionTypes.DELETE_TRIP_FAILED,
      payload: `Couldn't delete ${name} trip`
    });
  }
};
export const createExpense = (payload: CreateExpenseBody) => async (
  dispatch: Dispatch<any>
) => {
  const { name, date, title, description, price, category } = payload;
  dispatch({
    type: ActionTypes.CREATE_EXPENSE_REQUESTED
  });
  try {
    await fetch(`${baseUrl}/expense`, {
      ...(await getApiHeaders()),
      method: "PUT",
      body: JSON.stringify({
        name,
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
        name,
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
export const updateExpense = (payload: UpdateExpenseBody) => async (
  dispatch: Dispatch<any>
) => {
  dispatch({
    type: ActionTypes.UPDATE_EXPENSE_REQUESTED
  });
  try {
    await fetch(`${baseUrl}/expense`, {
      ...(await getApiHeaders()),
      method: "PATCH",
      body: JSON.stringify(payload)
    });
    dispatch({
      type: ActionTypes.UPDATE_EXPENSE_SUCCEEDED,
      payload
    });
  } catch {
    dispatch({
      type: ActionTypes.UPDATE_EXPENSE_FAILED,
      payload: `Couldn't update ${payload.name} trip`
    });
  }
};
export const deleteExpense = (payload: DeleteExpenseBody) => async (
  dispatch: Dispatch<any>
) => {
  const { name, category, expenseName } = payload;
  dispatch({
    type: ActionTypes.DELETE_EXPENSE_REQUESTED
  });
  try {
    await fetch(`${baseUrl}/expense`, {
      ...(await getApiHeaders()),
      method: "DELETE",
      body: JSON.stringify({
        name,
        category,
        expenseName
      })
    });
    dispatch({
      type: ActionTypes.DELETE_EXPENSE_SUCCEEDED,
      payload: { name, category, expenseName }
    });
  } catch {
    dispatch({
      type: ActionTypes.DELETE_EXPENSE_FAILED,
      payload: `Couldn't delete ${expenseName} expense in ${name} trip`
    });
  }
};
