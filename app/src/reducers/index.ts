import { combineReducers } from "redux";
import expensesReducer from "./expense";
import categoriesReducer from "./category";
import tripsReducer from "./trip";
import messagesReducer from "./messages";
import currentlySelectedReducer from "./currentlySelected";
import { Store } from "../types";

export const defaultStore: Store = {
  trips: [],
  categories: [],
  expenses: [],
  loading: false,
  messages: [],
  currentlySelected: {
    trip: {
      id: "0",
      endDate: "0",
      startDate: "0",
      name: "0",
      town: "0",
      backgroundUrl: ""
    },
    expense: {
      name: "0",
      id: "0",
      categoryId: "0",
      date: "0",
      description: "0",
      price: 0,
      currency: "PLN"
    }
  }
};

export default combineReducers({
  expenses: expensesReducer,
  categories: categoriesReducer,
  trips: tripsReducer,
  messages: messagesReducer,
  currentlySelected: currentlySelectedReducer
});
