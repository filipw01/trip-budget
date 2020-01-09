import {
  CreateExpenseRequest,
  DeleteExpenseRequest,
  UpdateExpenseRequest
} from "./requestTypes";
import { Response } from "express";
import { ExpenseCategory } from "./generalTypes";
const express = require("express");
const expenseRouter = express.Router();
import { db } from "./firebase";

expenseRouter.put("/", async (req: CreateExpenseRequest, res: Response) => {
  const { name, date, title, description, price, category } = req.body;
  const docRef = db
    .collection(req.user.name === "Anonymous" ? "public_trips" : "trips")
    .doc(name);
  let oldTripData;
  docRef
    .get()
    .then(doc => {
      oldTripData = doc.data();
      docRef
        .update({
          expenses: oldTripData?.expenses.map(
            (expenseCategory: ExpenseCategory) =>
              expenseCategory.name === category
                ? {
                    ...expenseCategory,
                    values: [
                      ...expenseCategory.values,
                      { title, date, description, price }
                    ]
                  }
                : expenseCategory
          )
        })
        .then((result: any) => res.send(result))
        .catch(error => console.error(error));
    })
    .catch(error => console.error(error));
});

expenseRouter.delete("/", async (req: DeleteExpenseRequest, res: Response) => {
  const { name, expenseName, category } = req.body;
  const docRef = db
    .collection(req.user.name === "Anonymous" ? "public_trips" : "trips")
    .doc(name);
  let oldTripData;
  docRef
    .get()
    .then(doc => {
      oldTripData = doc.data();
      docRef
        .update({
          expenses: oldTripData?.expenses.map(
            (expenseCategory: ExpenseCategory) =>
              expenseCategory.name === category
                ? {
                    ...expenseCategory,
                    values: expenseCategory.values.filter(
                      expense => expense.title !== expenseName
                    )
                  }
                : expenseCategory
          )
        })
        .then((result: any) => res.send(result))
        .catch(error => console.error(error));
    })
    .catch(error => console.error(error));
});

expenseRouter.patch("/", async (req: UpdateExpenseRequest, res: Response) => {
  const {
    name,
    category,
    expenseName,
    date,
    description,
    price,
    newTitle
  } = req.body;
  const docRef = db
    .collection(req.user.name === "Anonymous" ? "public_trips" : "trips")
    .doc(name);
  let oldTripData;
  console.log(oldTripData)
  docRef
    .get()
    .then(doc => {
      oldTripData = doc.data();
      docRef
        .update({
          expenses: oldTripData?.expenses.map(
            (expenseCategory: ExpenseCategory) =>
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
        })
        .then((result: any) => res.send(result))
        .catch(error => console.error(error));
    })
    .catch(error => console.error(error));
});

export default expenseRouter;
