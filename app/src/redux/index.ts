import firebase from "firebase/app";
import "firebase/auth";
import { combineReducers } from "redux";
import expensesReducer from "./expense";
import categoriesReducer from "./category";
import tripsReducer from "./trip";
import messagesReducer from "./messages";
import { currentlySelectedReducer } from "./currentlySelected";
import { Store } from "../types";

export enum ActionTypes {
  CREATE_TRIP_REQUESTED = "CREATE_TRIP_REQUESTED",
  CREATE_TRIP_SUCCEEDED = "CREATE_TRIP_SUCCEEDED",
  DELETE_TRIP_REQUESTED = "DELETE_TRIP_REQUESTED",
  DELETE_TRIP_SUCCEEDED = "DELETE_TRIP_SUCCEEDED",
  UPDATE_TRIP_REQUESTED = "UPDATE_TRIP_REQUESTED",
  UPDATE_TRIP_SUCCEEDED = "UPDATE_TRIP_SUCCEEDED",
  GET_TRIPS_REQUESTED = "GET_TRIPS_REQUESTED",
  GET_TRIPS_SUCCEEDED = "GET_TRIPS_SUCCEEDED",
  GET_CATEGORIES_REQUESTED = "GET_CATEGORIES_REQUESTED",
  GET_CATEGORIES_SUCCEEDED = "GET_CATEGORIES_SUCCEEDED",
  GET_EXPENSES_REQUESTED = "GET_EXPENSES_REQUESTED",
  GET_EXPENSES_SUCCEEDED = "GET_EXPENSES_SUCCEEDED",
  CREATE_EXPENSE_REQUESTED = "CREATE_EXPENSE_REQUESTED",
  CREATE_EXPENSE_SUCCEEDED = "CREATE_EXPENSE_SUCCEEDED",
  DELETE_EXPENSE_REQUESTED = "DELETE_EXPENSE_REQUESTED",
  DELETE_EXPENSE_SUCCEEDED = "DELETE_EXPENSE_SUCCEEDED",
  UPDATE_EXPENSE_REQUESTED = "UPDATE_EXPENSE_REQUESTED",
  UPDATE_EXPENSE_SUCCEEDED = "UPDATE_EXPENSE_SUCCEEDED",
  CREATE_CATEGORY_REQUESTED = "CREATE_CATEGORY_REQUESTED",
  CREATE_CATEGORY_SUCCEEDED = "CREATE_CATEGORY_SUCCEEDED",
  DELETE_CATEGORY_REQUESTED = "DELETE_CATEGORY_REQUESTED",
  DELETE_CATEGORY_SUCCEEDED = "DELETE_CATEGORY_SUCCEEDED",
  UPDATE_CATEGORY_REQUESTED = "UPDATE_CATEGORY_REQUESTED",
  UPDATE_CATEGORY_SUCCEEDED = "UPDATE_CATEGORY_SUCCEEDED",
  SHOW_MESSAGE = "SHOW_MESSAGE",
  HIDE_MESSAGE = "HIDE_MESSAGE",
  OPEN_TRIP = "OPEN_TRIP",
  MORE_TRIPS_REQUESTED = "MORE_TRIPS_REQUESTED",
  MORE_TRIPS_SUCCEEDED = "MORE_TRIPS_SUCCEEDED"
}

async function getToken() {
  try {
    return firebase.auth().currentUser?.getIdToken();
  } catch (error) {
    console.error(error);
  }
}

export const getApiHeaders = async () => ({
  mode: "cors" as "cors",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${await getToken()}`
  }
});

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

export const rootReducer = combineReducers({
  expenses: expensesReducer,
  categories: categoriesReducer,
  trips: tripsReducer,
  messages: messagesReducer,
  currentlySelected: currentlySelectedReducer
});
