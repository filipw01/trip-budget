import React from "react";
import TripsList from "../components/TripsList";
import NewTrip from "../components/NewTrip";

interface Props {}

const Trips: React.FC<Props> = () => {
  return (
    <div>
      <h1>Your trips</h1>
      <NewTrip />
      <TripsList />
    </div>
  );
};

export default Trips;
