import { combineReducers } from "redux";
import expensesReducer from "./expense";
import categoriesReducer from "./category";
import tripsReducer from "./trip";
import messagesReducer from "./messages";
import { Store } from "../types";

export const defaultStore: Store = {
  trips: [],
  categories: [],
  expenses: [],
  loading: false,
  messages: []
};

export default combineReducers({
  expenses: expensesReducer,
  categories: categoriesReducer,
  trips: tripsReducer,
  messages: messagesReducer
});
