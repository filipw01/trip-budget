import { ActionTypes } from "../actions/index";
import { Reducer } from "react";
import { ReducerArguments } from "../types";
import { defaultStore } from "./index";
import { Expense } from "../../../functions/src/generalTypes";

const expensesReducer: Reducer<any, ReducerArguments> = (
  expenses: Array<Expense> = defaultStore.expenses,
  { type, payload }
): Array<Expense> => {
  switch (type) {
    case ActionTypes.GET_EXPENSES_REQUESTED:
      return expenses;
    case ActionTypes.GET_EXPENSES_SUCCEEDED:
      return payload;
    case ActionTypes.CREATE_EXPENSE_REQUESTED:
      return expenses;
    case ActionTypes.CREATE_EXPENSE_SUCCEEDED:
      return [...expenses, payload];
    case ActionTypes.UPDATE_EXPENSE_REQUESTED:
      return expenses;
    case ActionTypes.UPDATE_EXPENSE_SUCCEEDED:
      return expenses.map(expense =>
        expense.id === payload.expenseId
          ? {
              ...expense,
              name: payload.name,
              categoryId: payload.categoryId,
              date: payload.date,
              description: payload.description,
              price: payload.price
            }
          : expense
      );
    case ActionTypes.DELETE_EXPENSE_REQUESTED:
      return expenses;
    case ActionTypes.DELETE_EXPENSE_SUCCEEDED:
      return expenses.filter(expense => expense.id !== payload.id);
    default:
      return expenses;
  }
};
export default expensesReducer;
