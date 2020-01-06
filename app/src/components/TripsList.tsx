import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getTrips, deleteTrip } from "../actions";
import BaseButton from "./BaseButton";
import TripDetails from "./TripDetails";

interface Props {
  trips: Array<Object>;
  tripsLoading: boolean;
  getTrips: Function;
  deleteTrip: Function;
}

interface Trip {
  tripName: string;
  dateStart: string;
  dateEnd: string;
  town: string;
  expenses: { name: string }[];
}

const TripsList: React.FC<Props> = ({
  trips,
  tripsLoading,
  getTrips,
  deleteTrip
}) => {
  useEffect(() => {
    getTrips();
  }, [getTrips]);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  return (
    <ul className="max-w-sm">
      {tripsLoading
        ? "Loading"
        : trips.length === 0
        ? "No data"
        : trips.map((trip: any) => (
            <li
              onClick={() => setSelectedTrip(trip)}
              className="flex justify-between px-6 py-4 border border-gray-700"
              key={trip.tripName}
            >
              {trip.tripName}
              <BaseButton clickHandler={() => deleteTrip(trip.tripName)}>
                Delete Trip
              </BaseButton>
            </li>
          ))}
      {selectedTrip ? <TripDetails trip={selectedTrip} /> : null}
    </ul>
  );
};

const mapStateToProps = (state: any) => ({
  trips: state.trips,
  tripsLoading: state.tripsLoading
});

const mapDispatchToProps = {
  getTrips,
  deleteTrip
};

export default connect(mapStateToProps, mapDispatchToProps)(TripsList);
