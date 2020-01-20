import { Dispatch } from "react";
import { baseUrl } from "../config";
import { ActionTypes, getApiHeaders } from "./index";
import {
  CreateExpenseBody,
  UpdateExpenseBody,
  DeleteExpenseBody,
  GetExpensesBody
} from "../../../functions/src/generalTypes";

export const getExpenses = (
  payload: { offset: number } & GetExpensesBody
) => async (dispatch: Dispatch<any>) => {
  dispatch({
    type: ActionTypes.GET_EXPENSES_REQUESTED
  });
  try {
    const data = await fetch(
      `${baseUrl}/expense/${payload.tripId}?offset=${payload.offset}`,
      {
        ...(await getApiHeaders()),
        method: "GET"
      }
    );
    dispatch({
      type: ActionTypes.GET_EXPENSES_SUCCEEDED,
      payload: await data.json()
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.SHOW_MESSAGE,
      payload: { type: "error", content: `Couldn't load the trips: ${error}` }
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
      type: ActionTypes.SHOW_MESSAGE,
      payload: { type: "error", content: `Couldn't create ${name} expense` }
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
      type: ActionTypes.SHOW_MESSAGE,
      payload: {
        type: "error",
        content: `Couldn't update ${payload.expenseId} expense`
      }
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
      type: ActionTypes.SHOW_MESSAGE,
      payload: {
        type: "error",
        content: `Couldn't delete ${expenseId} expense in ${tripId} trip`
      }
    });
  }
};
