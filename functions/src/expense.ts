import {
  CreateExpenseRequest,
  DeleteExpenseRequest,
  UpdateExpenseRequest,
  GetExpensesRequest
} from "./requestTypes";
import { Response } from "express";
const express = require("express");
const expenseRouter = express.Router();
import { db } from "./firebase";

expenseRouter.get(
  "/:tripId",
  async (req: GetExpensesRequest, res: Response) => {
    db.collection(req.user.name === "Anonymous" ? "public_trips" : "trips")
      .doc(req.params?.tripId)
      .collection("expenses")
      .get()
      .then((snapshot: any) => {
        const documents: Array<Object> = [];
        snapshot.forEach((doc: any) => {
          documents.push({ id: doc.id, ...doc.data() });
        });
        res.send(documents);
      })
      .catch((err: any) => {
        res.send(`Error getting expenses ${err}`);
      });
  }
);

expenseRouter.put("/", async (req: CreateExpenseRequest, res: Response) => {
  const { tripId, categoryId, name, date, description, price } = req.body;
  db.collection(req.user.name === "Anonymous" ? "public_trips" : "trips")
    .doc(tripId)
    .collection("expenses")
    .add({ categoryId, name, date, description, price })
    .then((result: any) => res.send(result))
    .catch(error => console.error(error));
});

expenseRouter.delete("/", async (req: DeleteExpenseRequest, res: Response) => {
  const { tripId, expenseId } = req.body;
  db.collection(req.user.name === "Anonymous" ? "public_trips" : "trips")
    .doc(tripId)
    .collection("expenses")
    .doc(expenseId)
    .delete()
    .then((result: any) => res.send(result))
    .catch(error => console.error(error));
});

expenseRouter.patch("/", async (req: UpdateExpenseRequest, res: Response) => {
  const {
    tripId,
    expenseId,
    name,
    date,
    description,
    price,
    categoryId
  } = req.body;
  db.collection(req.user.name === "Anonymous" ? "public_trips" : "trips")
    .doc(tripId)
    .collection("expenses")
    .doc(expenseId)
    .update({
      name,
      date,
      description,
      price,
      categoryId
    })
    .then((result: any) => res.send(result))
    .catch(error => console.error(error));
});

export default expenseRouter;
