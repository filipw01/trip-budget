import React, { useState } from "react";
import { connect } from "react-redux";
import { getTrips, deleteTrip, getCategories } from "../actions";
import BaseButton from "./BaseButton";
import TripDetails from "./TripDetails";
import LoadingOverlay from "./LoadingOverlay";
import { Store } from "../types";
import { DeleteTripBody, Trip } from "../../../functions/src/generalTypes";
interface Props {
  trips: Array<Trip>;
  tripsLoading: boolean;
  deletingTrip: { isDeleting: boolean; name: string };
  deleteTrip: (payload: DeleteTripBody) => any;
  getTrips: Function;
  getCategories: Function;
}

const TripsList: React.FC<Props> = ({
  trips,
  tripsLoading,
  deleteTrip,
  deletingTrip,
  getTrips,
  getCategories
}) => {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  return (
    <LoadingOverlay active={deletingTrip.isDeleting}>
      <BaseButton clickHandler={() => getTrips() && getCategories()}>
        Refresh
      </BaseButton>
      <ul className="max-w-sm">
        {tripsLoading
          ? "Loading"
          : trips.length === 0
          ? "No data"
          : trips.map(trip => (
              <li
                onClick={() => setSelectedTrip(trip)}
                className="flex justify-between px-6 py-4 border border-gray-700"
                key={trip.id}
              >
                {trip.name}
                <BaseButton
                  clickHandler={e =>
                    deleteTrip({ id: trip.id }) && e.stopPropagation()
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
  getCategories,
  deleteTrip
};

export default connect(mapStateToProps, mapDispatchToProps)(TripsList);
