import React from "react";
import { Trip } from "../../../functions/src/generalTypes";
import { Store } from "../types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { openTrip } from "../actions/trip";

interface Props {
  trip: Trip;
}

const TripsList: React.FC<Props> = ({ trip }) => {
  console.log(trip.backgroundUrl);
  return (
    <li key={trip.id}>
      <Link
        to="/trip"
        onClick={() => openTrip(trip)}
        key={trip.id}
        style={{ backgroundImage: `url('${trip.backgroundUrl}')` }}
        className="p-4 rounded-lg bg-gray-600 block h-48 bg-cover"
      >
        {trip.name}
      </Link>
    </li>
  );
};

const mapStateToProps = (state: Store) => ({
  trips: state.trips,
  loading: state.loading
});

const mapDispatchToProps = {
  openTrip
};

export default connect(mapStateToProps, mapDispatchToProps)(TripsList);
