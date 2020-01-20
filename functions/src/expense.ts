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
import { Trip } from "./generalTypes";

type AggregatedTrip = { expenses: { total: number; currency: string } } & Trip;

expenseRouter.get(
  "/:tripId",
  async (req: GetExpensesRequest, res: Response) => {
    const { offset } = req.query;
    db.collection(req.user.name === "Anonymous" ? "public_trips" : "trips")
      .doc(req.params?.tripId)
      .collection("expenses")
      .orderBy("date", "desc")
      .offset(offset)
      .limit(10)
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

  const docRef = db
    .collection(req.user.name === "Anonymous" ? "public_trips" : "trips")
    .doc(tripId)
    .collection("expenses")
    .doc();
  const aggregatedRef = db
    .collection(req.user.name === "Anonymous" ? "public_trips" : "trips")
    .doc("aggregated");

  db.runTransaction(transaction => {
    return transaction.get(aggregatedRef).then(doc => {
      const trips = doc.data()?.trips;
      transaction
        .update(aggregatedRef, {
          trips: trips.map((trip: AggregatedTrip) =>
            trip.id === tripId
              ? {
                  ...trip,
                  expenses: {
                    total: trip.expenses.total + price,
                    currency: trip.expenses.currency
                  }
                }
              : trip
          )
        })
        .set(docRef, { categoryId, name, date, description, price });
    });
  })
    .then((result: any) => res.send(result))
    .catch(error => console.error(error));
});

expenseRouter.delete("/", async (req: DeleteExpenseRequest, res: Response) => {
  const { tripId, expenseId } = req.body;

  const docRef = db
    .collection(req.user.name === "Anonymous" ? "public_trips" : "trips")
    .doc(tripId)
    .collection("expenses")
    .doc(expenseId);
  const aggregatedRef = db
    .collection(req.user.name === "Anonymous" ? "public_trips" : "trips")
    .doc("aggregated");

  db.runTransaction(transaction => {
    return transaction.get(aggregatedRef).then(document => {
      const trips = document.data()?.trips;
      transaction
        .get(docRef)
        .then(doc => {
          const oldPrice = doc.data()?.price;
          transaction
            .update(aggregatedRef, {
              trips: trips.map((trip: AggregatedTrip) =>
                trip.id === tripId
                  ? {
                      ...trip,
                      expenses: {
                        total: trip.expenses.total - oldPrice,
                        currency: trip.expenses.currency
                      }
                    }
                  : trip
              )
            })
            .delete(docRef);
        })
        .catch(error => console.error(error));
    });
  })
    .then(result => res.send(result))
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
    currency,
    categoryId
  } = req.body;
  const docRef = db
    .collection(req.user.name === "Anonymous" ? "public_trips" : "trips")
    .doc(tripId)
    .collection("expenses")
    .doc(expenseId);
  const aggregatedRef = db
    .collection(req.user.name === "Anonymous" ? "public_trips" : "trips")
    .doc("aggregated");

  let priceChanged = false;
  if (price !== undefined) priceChanged = true;

  db.runTransaction(transaction => {
    return transaction.get(aggregatedRef).then(document => {
      const trips = document.data()?.trips;
      if (priceChanged) {
        transaction
          .get(docRef)
          .then(doc => {
            const oldPrice = doc.data()?.price;
            const updatedExpenseDifference = (price as number) - oldPrice;
            transaction.update(aggregatedRef, {
              trips: trips.map((trip: AggregatedTrip) =>
                trip.id === tripId
                  ? {
                      ...trip,
                      expenses: {
                        total: trip.expenses.total + updatedExpenseDifference,
                        currency: trip.expenses.currency
                      }
                    }
                  : trip
              )
            });
          })
          .catch(error => console.error(error));
      }
      transaction.update(docRef, {
        name,
        date,
        description,
        price,
        currency,
        categoryId
      });
    });
  })
    .then(result => res.send(result))
    .catch(error => console.error(error));
});

export default expenseRouter;
