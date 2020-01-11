import { Request } from "express";
import {
  CreateExpenseBody,
  DeleteExpenseBody,
  UpdateExpenseBody,
  CreateCategoryBody,
  DeleteCategoryBody,
  UpdateCategoryBody,
  CreateTripBody,
  UpdateTripBody,
  DeleteTripBody,
  GetExpensesBody
} from "./generalTypes";

export interface RequestWithCredentials extends Request {
  user: { name: string };
}

export interface GetExpensesRequest extends RequestWithCredentials {
  body: GetExpensesBody;
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

export interface CreateCategoryRequest extends RequestWithCredentials {
  body: CreateCategoryBody;
}

export interface DeleteCategoryRequest extends RequestWithCredentials {
  body: DeleteCategoryBody;
}

export interface UpdateCategoryRequest extends RequestWithCredentials {
  body: UpdateCategoryBody;
}

export interface CreateTripRequest extends RequestWithCredentials {
  body: CreateTripBody;
}

export interface DeleteTripRequest extends RequestWithCredentials {
  body: DeleteTripBody;
}

export interface UpdateTripRequest extends RequestWithCredentials {
  body: UpdateTripBody;
}
