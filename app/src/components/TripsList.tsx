import React from "react";
import { connect } from "react-redux";
import { getCategories } from "../actions/category";
import {
  getTrips,
  moreTrips,
  moreTripsArguments
} from "../actions/trip";
import BaseButton from "./BaseButton";
import TripTile from "./TripTile";
import LoadingOverlay from "./LoadingOverlay";
import { Store } from "../types";
import { Trip } from "../../../functions/src/generalTypes";

interface Props {
  trips: Array<Trip>;
  loading: boolean;
  getTrips: Function;
  moreTrips: (payload: moreTripsArguments) => any;
  getCategories: Function;
}

const TripsList: React.FC<Props> = ({
  trips,
  loading,
  getTrips,
  getCategories,
  moreTrips
}) => {
  return (
    <LoadingOverlay active={loading}>
      <BaseButton clickHandler={() => getTrips() && getCategories()}>
        Refresh
      </BaseButton>
      <BaseButton clickHandler={() => moreTrips({ offset: trips.length })}>
        More
      </BaseButton>
      <ul className="grid grid-cols-3 gap-4">
        {loading
          ? "Loading"
          : trips.length === 0
          ? "No data"
          : trips.map(trip => <TripTile trip={trip} />)}
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
  moreTrips,
  getCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(TripsList);
