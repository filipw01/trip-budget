import React from "react";
import TripsList from "../components/TripsList";

interface Props {}

const Trips: React.FC<Props> = () => {
  return (
    <div>
      <h1 className="text-6xl text-center">Your trips</h1>
      <TripsList />
    </div>
  );
};

export default Trips;
