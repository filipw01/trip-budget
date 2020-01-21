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
  return (
    <Link
      to="/trip"
      onClick={() => openTrip(trip)}
      key={trip.id}
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 57.81%, rgba(0, 0, 0, 0.17) 100%), url('${trip.backgroundUrl}')`
      }}
      className="p-4 rounded-lg bg-gray-600 block bg-cover bg-center flex flex-col justify-between h-full"
    >
      <div>
        <h2 className="text-xl font-semibold inline">{trip.name}</h2>
        <span className="ml-1 italic">{trip.town}</span>
      </div>
      <div className="self-end">
        {trip.startDate}-{trip.endDate}
      </div>
    </Link>
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
