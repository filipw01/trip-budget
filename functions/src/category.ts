import { Response } from "express";
const express = require("express");
const categoryRouter = express.Router();
import { db } from "./firebase";
import {
  CreateCategoryRequest,
  DeleteCategoryRequest,
  UpdateCategoryRequest,
  RequestWithCredentials
} from "./requestTypes";

categoryRouter.get("/", (req: RequestWithCredentials, res: Response) => {
  db.collection(
    req.user.name === "Anonymous"
      ? "public_categories"
      : "categories"
  )
    .get()
    .then((snapshot: any) => {
      const documents: Array<Object> = [];
      snapshot.forEach((doc: any) => {
        documents.push({ id: doc.id, ...doc.data() });
      });
      res.send(documents);
    })
    .catch((err: any) => {
      res.send(`Error getting categories ${err}`);
    });
});

categoryRouter.put(
  "/",
  async (req: CreateCategoryRequest, res: Response) => {
    const { name, color } = req.body;
    db.collection(
      req.user.name === "Anonymous"
        ? "public_categories"
        : "categories"
    )
      .add({ name, color })
      .then((reference: any) => res.send(reference))
      .catch(error => console.error(error));
  }
);

categoryRouter.delete(
  "/",
  async (req: DeleteCategoryRequest, res: Response) => {
    const { id } = req.body;
    db.collection(
      req.user.name === "Anonymous"
        ? "public_categories"
        : "categories"
    )
      .doc(id)
      .delete()
      .then((result: any) => res.send(result))
      .catch(error => console.error(error));
  }
);

categoryRouter.patch(
  "/",
  async (req: UpdateCategoryRequest, res: Response) => {
    const { name, color, id } = req.body;
    db.collection(
      req.user.name === "Anonymous"
        ? "public_categories"
        : "categories"
    )
      .doc(id)
      .update({
        name,
        color
      })
      .then((result: any) => res.send(result))
      .catch(error => console.error(error));
  }
);

export default categoryRouter;
