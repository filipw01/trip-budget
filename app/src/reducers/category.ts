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
    default:
      return categories;
  }
};
export default categoriesReducer;
