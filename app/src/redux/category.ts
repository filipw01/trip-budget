import { Dispatch, Reducer } from "react";
import { baseUrl } from "../config";
import { ActionTypes, getApiHeaders, defaultStore } from "./index";
import { ReducerArguments } from "../types";
import {
  Category,
  CreateCategoryBody,
  UpdateCategoryBody,
  DeleteCategoryBody
} from "../../../functions/src/generalTypes";

const categoriesReducer: Reducer<any, ReducerArguments> = (
  categories: Array<Category> = defaultStore.categories,
  { type, payload }
): Array<Category> => {
  switch (type) {
    case ActionTypes.GET_CATEGORIES_REQUESTED:
      return categories;
    case ActionTypes.GET_CATEGORIES_SUCCEEDED:
      return payload;
    case ActionTypes.CREATE_CATEGORY_REQUESTED:
      return categories;
    case ActionTypes.CREATE_CATEGORY_SUCCEEDED:
      return [...categories, payload];
    case ActionTypes.UPDATE_CATEGORY_REQUESTED:
      return categories;
    case ActionTypes.UPDATE_CATEGORY_SUCCEEDED:
      return categories.map(category =>
        category.id === payload.id ? payload : category
      );
    case ActionTypes.DELETE_CATEGORY_REQUESTED:
      return categories;
    case ActionTypes.DELETE_CATEGORY_SUCCEEDED:
      return categories.filter(category => category.id !== payload.id);
    default:
      return categories;
  }
};
export default categoriesReducer

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
