import { Dispatch } from "react";
import { baseUrl } from "../config";
import { ActionTypes, getApiHeaders } from "./index";
import {
  CreateCategoryBody,
  UpdateCategoryBody,
  DeleteCategoryBody
} from "../../../functions/src/generalTypes";

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
      type: ActionTypes.SHOW_MESSAGE,
      payload: { type: "error", content: `Couldn't load the trips: ${error}` }
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
      type: ActionTypes.SHOW_MESSAGE,
      payload: { type: "error", content: `Couldn't create ${name} category` }
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
      type: ActionTypes.SHOW_MESSAGE,
      payload: {
        type: "error",
        content: `Couldn't update ${payload.id} category`
      }
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
      type: ActionTypes.SHOW_MESSAGE,
      payload: { type: "error", content: `Couldn't delete ${id} category` }
    });
  }
};
