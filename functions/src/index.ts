import * as functions from "firebase-functions";
import { validateFirebaseIdToken } from "./middlewares/validateFirebaseIdToken";
import tripRouter from "./trip";
import expenseRouter from "./expense";
const cors = require("cors")({ origin: true });
const express = require("express");
const cookieParser = require("cookie-parser")();
const app = express();

export function addIfDefined(object: any, property: any, propertyName: string) {
  if (property !== undefined) object[propertyName] = property;
}

// Add middlewares
app.use(cors);
app.use(cookieParser);
app.use(validateFirebaseIdToken);

// Add routes
app.use("/trip", tripRouter);
app.use("/expense", expenseRouter);

exports.app = functions.https.onRequest(app);
