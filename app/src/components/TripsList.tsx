import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getTrips, deleteTrip } from "../actions";
import BaseButton from "./BaseButton";
import TripDetails from "./TripDetails";
import { Store } from "../reducers";
import LoadingOverlay from "./LoadingOverlay";
import { Trip } from "../reducers";
interface Props {
  trips: Array<Object | never>;
  tripsLoading: boolean;
  deletingTrip: { isDeleting: boolean; tripName: string };
  getTrips: Function;
  deleteTrip: Function;
}

const TripsList: React.FC<Props> = ({
  trips,
  tripsLoading,
  getTrips,
  deleteTrip,
  deletingTrip
}) => {
  useEffect(() => {
    getTrips();
  }, [getTrips]);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  return (
    <LoadingOverlay active={deletingTrip.isDeleting}>
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
                <BaseButton
                  clickHandler={e =>
                    deleteTrip(trip.tripName) && e.stopPropagation()
                  }
                >
                  Delete
                </BaseButton>
              </li>
            ))}
        {selectedTrip ? <TripDetails trip={selectedTrip} /> : null}
      </ul>
    </LoadingOverlay>
  );
};

const mapStateToProps = (state: Store) => ({
  trips: state.trips,
  tripsLoading: state.tripsLoading,
  deletingTrip: state.deletingTrip
});

const mapDispatchToProps = {
  getTrips,
  deleteTrip
};

export default connect(mapStateToProps, mapDispatchToProps)(TripsList);
