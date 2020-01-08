import {
  CreateExpenseRequest,
  DeleteExpenseRequest,
  UpdateExpenseRequest
} from "./requestTypes";
import { Response } from "express";
import { ExpenseCategory } from "./generalTypes";
const express = require("express");
const expenseRouter = express.Router();
const { db, addIfDefined } = require("./index");

expenseRouter.put("/", async (req: CreateExpenseRequest, res: Response) => {
  const { tripName, date, title, description, price, category } = req.body;
  const docRef = db
    .collection(req.user.name === "Anonymous" ? "public_trips" : "trips")
    .doc(tripName);
  let oldTripData: any;
  docRef.get().then((doc: any) => {
    oldTripData = doc.data();
    const newTripData = {};
    addIfDefined(newTripData, date, "date");
    addIfDefined(newTripData, title, "title");
    addIfDefined(newTripData, description, "description");
    addIfDefined(newTripData, price, "price");
    docRef
      .update({
        expenses: [
          ...oldTripData.expenses.map((expenseCategory: ExpenseCategory) =>
            expenseCategory.name === category
              ? {
                  ...expenseCategory,
                  values: [...expenseCategory.values, newTripData]
                }
              : expenseCategory
          )
        ]
      })
      .then((result: any) => res.send(result));
  });
});

expenseRouter.delete("/", async (req: DeleteExpenseRequest, res: Response) => {
  const { tripName, category, expenseName } = req.body;
  const docRef = db
    .collection(req.user.name === "Anonymous" ? "public_trips" : "trips")
    .doc(tripName);

  let oldTripData: any;
  docRef.get().then((doc: any) => {
    oldTripData = doc.data();
    docRef
      .update({
        expenses: [
          ...oldTripData.expenses.map((expenseCategory: ExpenseCategory) =>
            expenseCategory.name === category
              ? {
                  ...expenseCategory,
                  values: expenseCategory.values.filter(
                    (expense) => expense.title !== expenseName
                  )
                }
              : expenseCategory
          )
        ]
      })
      .then((result: any) => res.send(result));
  });
});

expenseRouter.patch("/", async (req: UpdateExpenseRequest, res: Response) => {
  const {
    tripName,
    category,
    expenseName,
    date,
    description,
    price,
    newTitle
  } = req.body;
  const docRef = db
    .collection(req.user.name === "Anonymous" ? "public_trips" : "trips")
    .doc(tripName);

  let oldTripData: any;
  docRef.get().then((doc: any) => {
    oldTripData = doc.data();
    docRef
      .update({
        expenses: [
          ...oldTripData.expenses.map((expenseCategory: ExpenseCategory) =>
            expenseCategory.name === category
              ? {
                  ...expenseCategory,
                  values: expenseCategory.values.map(expense =>
                    expense.title === expenseName
                      ? { title: newTitle, price, description, date }
                      : expense
                  )
                }
              : expenseCategory
          )
        ]
      })
      .then((result: any) => res.send(result));
  });
});

export default expenseRouter;
