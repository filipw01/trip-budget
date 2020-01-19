import React from "react";
import TripDetails from "../components/TripDetails";
import { Trip as TripType } from "../../../functions/src/generalTypes";
import { connect } from "react-redux";
import { Store } from "../types";

interface Props {
  trip: TripType;
}

const Trip: React.FC<Props> = ({ trip }) => {
  return (
    <div>
      <h1>{trip.name}</h1>
      <TripDetails trip={trip} />
    </div>
  );
};

const mapStateToProps = (state: Store) => ({
  trip: state.currentlySelected.trip
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Trip);
