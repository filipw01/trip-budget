import {
  GetTripsRequest,
  CreateTripRequest,
  DeleteTripRequest,
  UpdateTripRequest
} from "./requestTypes";
import { Response } from "express";
const express = require("express");
const tripRouter = express.Router();
import { addIfDefined } from "./index";
import { db } from "./firebase";

tripRouter.get("/", (req: GetTripsRequest, res: Response) => {
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

tripRouter.put("/", async (req: CreateTripRequest, res: Response) => {
  const { name, startDate, endDate, town } = req.body;
  const docRef = db
    .collection(req.user.name === "Anonymous" ? "public_trips" : "trips")
    .doc(name);

  const newTrip = await docRef.set({
    name,
    startDate,
    endDate,
    town,
    expenses: [
      { name: "accommodation", values: [] },
      { name: "food", values: [] },
      { name: "travel", values: [] }
    ]
  });
  res.send(newTrip);
});

tripRouter.delete("/", async (req: DeleteTripRequest, res: Response) => {
  const { name } = req.body;
  const deletedTrip = await db
    .collection(req.user.name === "Anonymous" ? "public_trips" : "trips")
    .doc(name)
    .delete();

  res.send(deletedTrip);
});

tripRouter.patch("/", async (req: UpdateTripRequest, res: Response) => {
  const { name, startDate, endDate, town, newName } = req.body;
  const docRef = db
    .collection(req.user.name === "Anonymous" ? "public_trips" : "trips")
    .doc(name);
  const updateData = {};
  addIfDefined(updateData, newName, "name");
  addIfDefined(updateData, startDate, "startDate");
  addIfDefined(updateData, endDate, "endDate");
  addIfDefined(updateData, town, "town");
  const trip = await docRef.update(updateData);
  res.send(trip);
});

export default tripRouter;
