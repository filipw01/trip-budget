import { Request } from "express";
import {
  CreateExpenseBody,
  DeleteExpenseBody,
  UpdateExpenseBody,
  GetTripsBody,
  CreateTripBody
} from "./generalTypes";

export interface RequestWithCredentials extends Request {
  user: { name: string };
}

export interface CreateExpenseRequest extends RequestWithCredentials {
  body: CreateExpenseBody;
}

export interface DeleteExpenseRequest extends RequestWithCredentials {
  body: DeleteExpenseBody;
}

export interface UpdateExpenseRequest extends RequestWithCredentials {
  body: UpdateExpenseBody;
}

export interface GetTripsRequest extends RequestWithCredentials {
  body: GetTripsBody;
}

export interface CreateTripRequest extends RequestWithCredentials {
  body: CreateTripBody;
}

export interface DeleteTripRequest extends RequestWithCredentials {
  body: DeleteTripRequest;
}

export interface UpdateTripRequest extends RequestWithCredentials {
  body: UpdateTripRequest;
}
