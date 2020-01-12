import {
  CreateTripRequest,
  DeleteTripRequest,
  UpdateTripRequest,
  RequestWithCredentials
} from "./requestTypes";
import { Response } from "express";
const express = require("express");
const tripRouter = express.Router();
// import { addIfDefined } from "./index";
import { db } from "./firebase";

tripRouter.get("/", (req: RequestWithCredentials, res: Response) => {
  db.collection(req.user.name === "Anonymous" ? "public_trips" : "trips")
    .get()
    .then((snapshot: any) => {
      const documents: Array<Object> = [];
      snapshot.forEach((doc: any) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      res.send(documents);
    })
    .catch((err: any) => {
      res.send(`Error getting documents ${err}`);
    });
});

tripRouter.put("/", async (req: CreateTripRequest, res: Response) => {
  const { name, startDate, endDate, town } = req.body;
  db.collection(req.user.name === "Anonymous" ? "public_trips" : "trips")
    .add({
      name,
      startDate,
      endDate,
      town
    })
    .then(result => res.send(result))
    .catch(error => console.error(error));
});

tripRouter.delete("/", async (req: DeleteTripRequest, res: Response) => {
  const { id } = req.body;
  const deletedTrip = await db
    .collection(req.user.name === "Anonymous" ? "public_trips" : "trips")
    .doc(id)
    .delete();

  res.send(deletedTrip);
});

tripRouter.patch("/", async (req: UpdateTripRequest, res: Response) => {
  const { name, startDate, endDate, town, id } = req.body;
  db.collection(req.user.name === "Anonymous" ? "public_trips" : "trips")
    .doc(id)
    .update({ name, startDate, endDate, town })
    .then(result => res.send(result))
    .catch(error => console.error(error));
});

export default tripRouter;
