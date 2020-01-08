import {
  GetTripsRequest,
  CreateTripRequest,
  DeleteTripRequest,
  UpdateTripRequest
} from "./requestTypes";
import { Response } from "express";
const express = require("express");
const trip = express.Router();
const { db, addIfDefined } = require("./index");

trip.get("/", (req: GetTripsRequest, res: Response) => {
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
      res.send(`Error getting documents ${err}`);
    });
});

trip.put("/", async (req: CreateTripRequest, res: Response) => {
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

trip.delete("/", async (req: DeleteTripRequest, res: Response) => {
  const { tripName } = req.body;
  const deletedTrip = await db
    .collection(req.user.name === "Anonymous" ? "public_trips" : "trips")
    .doc(tripName)
    .delete();

  res.send(deletedTrip);
});

trip.patch("/", async (req: UpdateTripRequest, res: Response) => {
  const {
    tripName,
    dateStart,
    dateEnd,
    town,
    expenses,
    newTripName
  } = req.body;
  const docRef = db
    .collection(req.user.name === "Anonymous" ? "public_trips" : "trips")
    .doc(tripName);
  const updateData = {};
  addIfDefined(updateData, newTripName, "tripName");
  addIfDefined(updateData, dateStart, "dateStart");
  addIfDefined(updateData, dateEnd, "dateEnd");
  addIfDefined(updateData, town, "town");
  addIfDefined(updateData, expenses, "expenses");
  const trip = await docRef.update(updateData);
  res.send(trip);
});

export default trip;
