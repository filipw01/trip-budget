import React from "react";
import { connect } from "react-redux";
import { getCategories } from "../actions/category";
import { getTrips, deleteTrip, openTrip } from "../actions/trip";
import BaseButton from "./BaseButton";
import LoadingOverlay from "./LoadingOverlay";
import { Store } from "../types";
import { DeleteTripBody, Trip } from "../../../functions/src/generalTypes";
import { Link } from "react-router-dom";
interface Props {
  trips: Array<Trip>;
  loading: boolean;
  deleteTrip: (payload: DeleteTripBody) => any;
  getTrips: Function;
  getCategories: Function;
  openTrip: Function;
}

const TripsList: React.FC<Props> = ({
  trips,
  loading,
  deleteTrip,
  getTrips,
  getCategories,
  openTrip
}) => {
  return (
    <LoadingOverlay active={loading}>
      <BaseButton clickHandler={() => getTrips() && getCategories()}>
        Refresh
      </BaseButton>
      <ul className="max-w-sm">
        {loading
          ? "Loading"
          : trips.length === 0
          ? "No data"
          : trips.map(trip => (
              <Link
                to="/trip"
                onClick={() => openTrip(trip)}
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
              </Link>
            ))}
      </ul>
    </LoadingOverlay>
  );
};

const mapStateToProps = (state: Store) => ({
  trips: state.trips,
  loading: state.loading
});

const mapDispatchToProps = {
  getTrips,
  getCategories,
  deleteTrip,
  openTrip
};

export default connect(mapStateToProps, mapDispatchToProps)(TripsList);
