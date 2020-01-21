import {
  CreateTripRequest,
  DeleteTripRequest,
  UpdateTripRequest,
  RequestWithCredentials
} from "./requestTypes";
import { Response } from "express";
const express = require("express");
const tripRouter = express.Router();
import { db } from "./firebase";
import { Trip } from "./generalTypes";

tripRouter.get("/", (req: RequestWithCredentials, res: Response) => {
  db.collection(req.user.name === "Anonymous" ? "public_trips" : "trips")
    .doc("aggregated")
    .get()
    .then((doc: any) => {
      res.send(doc.data());
    })
    .catch((err: any) => {
      res.send(`Error getting documents ${err}`);
    });
});

tripRouter.get("/more", (req: RequestWithCredentials, res: Response) => {
  const { offset } = req.query;
  db.collection(req.user.name === "Anonymous" ? "public_trips" : "trips")
    .orderBy("endDate", "desc")
    .offset(Number(offset))
    .limit(10)
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
  const { name, startDate, endDate, town, backgroundUrl } = req.body;
  const docRef = db
    .collection(req.user.name === "Anonymous" ? "public_trips" : "trips")
    .doc();
  const aggregatedRef = db
    .collection(req.user.name === "Anonymous" ? "public_trips" : "trips")
    .doc("aggregated");
  console.log(req.body.backgroundUrl);
  db.runTransaction(transaction => {
    return transaction.get(aggregatedRef).then(doc => {
      const trips = doc.data()?.trips;
      transaction
        .set(docRef, {
          id: docRef.id,
          name,
          startDate,
          endDate,
          town,
          backgroundUrl
        })
        .update(aggregatedRef, {
          trips: [
            ...trips,
            {
              id: docRef.id,
              name,
              startDate,
              endDate,
              town,
              backgroundUrl,
              expenses: { total: 0, currency: "PLN" }
            }
          ]
            .sort(
              (a, b) =>
                b.endDate.slice(0, 4) - a.endDate.slice(0, 4) ||
                b.endDate.slice(5, 7) - a.endDate.slice(5, 7) ||
                b.endDate.slice(8, 10) - a.endDate.slice(8, 10)
            )
            .slice(0, 10)
        });
    });
  })
    .then(() => res.send({id: docRef.id}))
    .catch(error => console.error(error));
});

tripRouter.patch("/", async (req: UpdateTripRequest, res: Response) => {
  const { name, startDate, endDate, town, id, backgroundUrl } = req.body;
  const tripRef = db
    .collection(req.user.name === "Anonymous" ? "public_trips" : "trips")
    .doc(id);
  const aggregatedRef = db
    .collection(req.user.name === "Anonymous" ? "public_trips" : "trips")
    .doc("aggregated");

  db.runTransaction(transaction => {
    return transaction.get(aggregatedRef).then(doc => {
      const trips = doc.data()?.trips;
      const latestTrips = [
        ...trips.filter((trip: Trip) => trip.id !== id),
        { id: id, name, startDate, endDate, town, backgroundUrl }
      ]
        .sort(
          (a, b) =>
            b.endDate.slice(0, 4) - a.endDate.slice(0, 4) ||
            b.endDate.slice(5, 7) - a.endDate.slice(5, 7) ||
            b.endDate.slice(8, 10) - a.endDate.slice(8, 10)
        )
        .slice(0, 10);
      transaction
        .update(aggregatedRef, {
          trips: latestTrips
        })
        .update(tripRef, { name, startDate, endDate, town, backgroundUrl });
    });
  })
    .then(result => res.send(result))
    .catch(error => console.error(error));
});

tripRouter.delete("/", async (req: DeleteTripRequest, res: Response) => {
  const { id } = req.body;
  const tripRef = db
    .collection(req.user.name === "Anonymous" ? "public_trips" : "trips")
    .doc(id);
  const aggregatedRef = db
    .collection(req.user.name === "Anonymous" ? "public_trips" : "trips")
    .doc("aggregated");
  db.runTransaction(transaction => {
    return transaction.get(aggregatedRef).then(doc => {
      const trips = doc.data()?.trips;
      transaction
        .update(aggregatedRef, {
          trips: trips.filter((trip: Trip) => trip.id !== id)
        })
        .delete(tripRef);
    });
  })
    .then(result => res.send(result))
    .catch(error => console.error(error));
});

export default tripRouter;
