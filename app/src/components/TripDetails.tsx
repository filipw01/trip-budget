import React from "react";
import { Trip, ExpenseCategory, Expense } from "../reducers";

interface Props {
  trip: Trip;
}

const TripDetails: React.FC<Props> = ({ trip }) => {
  return (
    <div>
      <div>{trip.tripName}</div>
      <div>{trip.dateStart}</div>
      <div>{trip.dateEnd}</div>
      <div>{trip.town}</div>
      {trip.expenses.map((expenseCategory: ExpenseCategory) => (
        <div>
          {expenseCategory.name}
          <p>
            {expenseCategory.values.map((expense: Expense) => expense.title)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TripDetails;
