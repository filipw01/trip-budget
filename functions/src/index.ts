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
    expenses: [{ name: "accommodation" }, { name: "food" }, { name: "travel" }]
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

exports.app = functions.https.onRequest(app);
