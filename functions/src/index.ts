import * as functions from "firebase-functions";
const admin = require("firebase-admin");
const serviceAccount = require("../trip-budget-27472.json");
const cors = require("cors")({ origin: true });
const express = require("express");
const cookieParser = require("cookie-parser")();
const app = express();
import { validateFirebaseIdToken } from "./middlewares/validateFirebaseIdToken";

function addIfDefined(object: any, property: any, propertyName: string) {
  if (property !== undefined) object[propertyName] = property;
}

// Add middlewares
app.use(cors);
app.use(cookieParser);
app.use(validateFirebaseIdToken);

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://trip-budget-27472.firebaseio.com"
});

const db = admin.firestore();

app.get("/getTrips", (req: any, res: any) => {
  db.collection(req.user.name === "Anonymous" ? "public_trips" : "trips")
    .get()
    .then((snapshot: any) => {
      const documents: Array<Object> = [];
      snapshot.forEach((doc: any) => {
        documents.push(doc.data());
      });
      res.send(documents);
    })
    .catch((err: any) => {
      res.send("Error getting documents", err);
    });
});

app.put("/createTrip", async (req: any, res: any) => {
  const { tripName, dateStart, dateEnd, town } = req.body;
  const docRef = db
    .collection(req.user.name === "Anonymous" ? "public_trips" : "trips")
    .doc(tripName);

  const newTrip = await docRef.set({
    tripName,
    dateStart,
    dateEnd,
    town,
    expenses: [
      { name: "accommodation", values: [] },
      { name: "food", values: [] },
      { name: "travel", values: [] }
    ]
  });
  res.send(newTrip);
});

app.delete("/deleteTrip", async (req: any, res: any) => {
  const { tripName } = req.body;
  const deletedTrip = await db
    .collection(req.user.name === "Anonymous" ? "public_trips" : "trips")
    .doc(tripName)
    .delete();

  res.send(deletedTrip);
});

app.patch("/updateTrip", async (req: any, res: any) => {
  const { tripName, dateStart, dateEnd, town, expenses } = req.body;
  const docRef = db
    .collection(req.user.name === "Anonymous" ? "public_trips" : "trips")
    .doc(tripName);
  const updateData = {};
  addIfDefined(updateData, tripName, "tripName");
  addIfDefined(updateData, dateStart, "dateStart");
  addIfDefined(updateData, dateEnd, "dateEnd");
  addIfDefined(updateData, town, "town");
  addIfDefined(updateData, expenses, "expenses");
  const trip = await docRef.update(updateData);
  res.send(trip);
});

app.put("/createExpense", async (req: any, res: any) => {
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
          ...oldTripData.expenses.map((expense: any) =>
            expense.name === category
              ? { ...expense, values: [...expense.values, newTripData] }
              : expense
          )
        ]
      })
      .then((result: any) => res.send(result));
  });
});

app.delete("/deleteExpense", async (req: any, res: any) => {
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
          ...oldTripData.expenses.map((expenseCategory: any) =>
            expenseCategory.name === category
              ? {
                  ...expenseCategory,
                  values: expenseCategory.values.filter(
                    (expense: { title: string }) => expense.title !== expenseName
                  )
                }
              : expenseCategory
          )
        ]
      })
      .then((result: any) => res.send(result));
  });
});

exports.app = functions.https.onRequest(app);
