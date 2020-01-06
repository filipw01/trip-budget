import React from "react";
import { Expense } from "../reducers";

interface Props {
  trip: {
    tripName: string;
    dateStart: string;
    dateEnd: string;
    town: string;
    expenses: { name: string; items?: Expense[] }[];
  };
}

const TripDetails: React.FC<Props> = ({ trip }) => {
  return (
    <div>
      <div>{trip.tripName}</div>
      <div>{trip.dateStart}</div>
      <div>{trip.dateEnd}</div>
      <div>{trip.town}</div>
      {trip.expenses.map(expense => (
        <div>
          {expense.name}
          <p>{expense?.items}</p>
        </div>
      ))}
    </div>
  );
};

export default TripDetails;
