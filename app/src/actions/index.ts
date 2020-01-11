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
  DeleteExpenseBody,
  GetExpensesBody,
  CreateCategoryBody,
  UpdateCategoryBody,
  DeleteCategoryBody
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
  GET_CATEGORIES_REQUESTED = "GET_CATEGORIES_REQUESTED",
  GET_CATEGORIES_FAILED = "GET_CATEGORIES_FAILED",
  GET_CATEGORIES_SUCCEEDED = "GET_CATEGORIES_SUCCEEDED",
  GET_EXPENSES_REQUESTED = "GET_EXPENSES_REQUESTED",
  GET_EXPENSES_FAILED = "GET_EXPENSES_FAILED",
  GET_EXPENSES_SUCCEEDED = "GET_EXPENSES_SUCCEEDED",
  CREATE_EXPENSE_REQUESTED = "CREATE_EXPENSE_REQUESTED",
  CREATE_EXPENSE_FAILED = "CREATE_EXPENSE_FAILED",
  CREATE_EXPENSE_SUCCEEDED = "CREATE_EXPENSE_SUCCEEDED",
  DELETE_EXPENSE_REQUESTED = "DELETE_EXPENSE_REQUESTED",
  DELETE_EXPENSE_FAILED = "DELETE_EXPENSE_FAILED",
  DELETE_EXPENSE_SUCCEEDED = "DELETE_EXPENSE_SUCCEEDED",
  UPDATE_EXPENSE_REQUESTED = "UPDATE_EXPENSE_REQUESTED",
  UPDATE_EXPENSE_FAILED = "UPDATE_EXPENSE_FAILED",
  UPDATE_EXPENSE_SUCCEEDED = "UPDATE_EXPENSE_SUCCEEDED",
  CREATE_CATEGORY_REQUESTED = "CREATE_CATEGORY_REQUESTED",
  CREATE_CATEGORY_FAILED = "CREATE_CATEGORY_FAILED",
  CREATE_CATEGORY_SUCCEEDED = "CREATE_CATEGORY_SUCCEEDED",
  DELETE_CATEGORY_REQUESTED = "DELETE_CATEGORY_REQUESTED",
  DELETE_CATEGORY_FAILED = "DELETE_CATEGORY_FAILED",
  DELETE_CATEGORY_SUCCEEDED = "DELETE_CATEGORY_SUCCEEDED",
  UPDATE_CATEGORY_REQUESTED = "UPDATE_CATEGORY_REQUESTED",
  UPDATE_CATEGORY_FAILED = "UPDATE_CATEGORY_FAILED",
  UPDATE_CATEGORY_SUCCEEDED = "UPDATE_CATEGORY_SUCCEEDED"
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
    const id = jsonResponse._path.segments[1];
    dispatch({
      type: ActionTypes.CREATE_TRIP_SUCCEEDED,
      payload: {
        id,
        ...payload
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
      payload: `Couldn't update ${payload.id} trip`
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
  } catch {
    dispatch({
      type: ActionTypes.DELETE_TRIP_FAILED,
      payload: `Couldn't delete ${id} trip`
    });
  }
};
export const getExpenses = (payload: GetExpensesBody) => async (
  dispatch: Dispatch<any>
) => {
  dispatch({
    type: ActionTypes.GET_EXPENSES_REQUESTED
  });
  try {
    const data = await fetch(`${baseUrl}/expense/${payload.tripId}`, {
      ...(await getApiHeaders()),
      method: "GET"
    });
    dispatch({
      type: ActionTypes.GET_EXPENSES_SUCCEEDED,
      payload: await data.json()
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.GET_EXPENSES_FAILED,
      payload: `Couldn't load the trips: ${error}`
    });
  }
};
export const createExpense = (payload: CreateExpenseBody) => async (
  dispatch: Dispatch<any>
) => {
  const { name } = payload;
  dispatch({
    type: ActionTypes.CREATE_EXPENSE_REQUESTED
  });
  try {
    await fetch(`${baseUrl}/expense`, {
      ...(await getApiHeaders()),
      method: "PUT",
      body: JSON.stringify(payload)
    });
    dispatch({
      type: ActionTypes.CREATE_EXPENSE_SUCCEEDED,
      payload
    });
  } catch {
    dispatch({
      type: ActionTypes.CREATE_EXPENSE_FAILED,
      payload: `Couldn't create ${name} expense`
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
      payload: `Couldn't update ${payload.expenseId} expense`
    });
  }
};
export const deleteExpense = (payload: DeleteExpenseBody) => async (
  dispatch: Dispatch<any>
) => {
  const { tripId, expenseId } = payload;
  dispatch({
    type: ActionTypes.DELETE_EXPENSE_REQUESTED
  });
  try {
    await fetch(`${baseUrl}/expense`, {
      ...(await getApiHeaders()),
      method: "DELETE",
      body: JSON.stringify(payload)
    });
    dispatch({
      type: ActionTypes.DELETE_EXPENSE_SUCCEEDED,
      payload
    });
  } catch {
    dispatch({
      type: ActionTypes.DELETE_EXPENSE_FAILED,
      payload: `Couldn't delete ${expenseId} expense in ${tripId} trip`
    });
  }
};
export const getCategories = () => async (dispatch: Dispatch<any>) => {
  dispatch({
    type: ActionTypes.GET_CATEGORIES_REQUESTED
  });
  try {
    const data = await fetch(`${baseUrl}/category`, {
      ...(await getApiHeaders()),
      method: "GET"
    });
    dispatch({
      type: ActionTypes.GET_CATEGORIES_SUCCEEDED,
      payload: await data.json()
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.GET_CATEGORIES_FAILED,
      payload: `Couldn't load the trips: ${error}`
    });
  }
};
export const createCategory = (payload: CreateCategoryBody) => async (
  dispatch: Dispatch<any>
) => {
  const { name } = payload;
  dispatch({
    type: ActionTypes.CREATE_CATEGORY_REQUESTED
  });
  try {
    await fetch(`${baseUrl}/category`, {
      ...(await getApiHeaders()),
      method: "PUT",
      body: JSON.stringify(payload)
    });
    dispatch({
      type: ActionTypes.CREATE_CATEGORY_SUCCEEDED,
      payload
    });
  } catch {
    dispatch({
      type: ActionTypes.CREATE_CATEGORY_FAILED,
      payload: `Couldn't create ${name} category`
    });
  }
};
export const updateCategory = (payload: UpdateCategoryBody) => async (
  dispatch: Dispatch<any>
) => {
  dispatch({
    type: ActionTypes.UPDATE_EXPENSE_REQUESTED
  });
  try {
    await fetch(`${baseUrl}/category`, {
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
      payload: `Couldn't update ${payload.id} category`
    });
  }
};
export const deleteCategory = (payload: DeleteCategoryBody) => async (
  dispatch: Dispatch<any>
) => {
  const { id } = payload;
  dispatch({
    type: ActionTypes.DELETE_EXPENSE_REQUESTED
  });
  try {
    await fetch(`${baseUrl}/category`, {
      ...(await getApiHeaders()),
      method: "DELETE",
      body: JSON.stringify(payload)
    });
    dispatch({
      type: ActionTypes.DELETE_EXPENSE_SUCCEEDED,
      payload
    });
  } catch {
    dispatch({
      type: ActionTypes.DELETE_EXPENSE_FAILED,
      payload: `Couldn't delete ${id} category`
    });
  }
};
