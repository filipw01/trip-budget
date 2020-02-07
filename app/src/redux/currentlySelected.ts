import { ActionTypes, defaultStore } from "./index";
import { Reducer } from "react";
import { ReducerArguments } from "../types";
import { Trip, Expense } from "../../../functions/src/generalTypes";

interface currentlySelected {
  trip: Trip;
  expense: Expense;
}

export const currentlySelectedReducer: Reducer<any, ReducerArguments> = (
  currentlySelected: currentlySelected = defaultStore.currentlySelected,
  { type, payload }
): currentlySelected => {
  switch (type) {
    case ActionTypes.OPEN_TRIP:
      return { ...currentlySelected, trip: payload };
    default:
      return currentlySelected;
  }
};
