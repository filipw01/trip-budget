import React from "react";

interface Props {
  trip: {
    tripName: string;
    dateStart: string;
    dateEnd: string;
    town: string;
    expenses: { name: string }[];
  };
}

const TripDetails: React.FC<Props> = ({ trip }) => {
  return (
    <div>
      <div>{trip.tripName}</div>
      <div>{trip.dateStart}</div>
      <div>{trip.dateEnd}</div>
      <div>{trip.town}</div>
      {trip.expenses.map(expense => expense.name)}
    </div>
  );
};

export default TripDetails;
