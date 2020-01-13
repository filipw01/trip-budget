import { ActionTypes } from "../actions/index";
import { Reducer } from "react";
import { ReducerArguments } from "../types";
import { defaultStore } from "./index";
import { Category } from "../../../functions/src/generalTypes";

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
export default categoriesReducer;
