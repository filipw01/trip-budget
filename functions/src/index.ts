import * as functions from "firebase-functions";
import { validateFirebaseIdToken } from "./middlewares/validateFirebaseIdToken";
import tripRouter from "./trip";
import expenseRouter from "./expense";
import categoryRouter from "./category";
import * as express from 'express'
const cors = require("cors")({ origin: true });
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
app.use("/category", categoryRouter);

exports.app = functions.https.onRequest(app);
