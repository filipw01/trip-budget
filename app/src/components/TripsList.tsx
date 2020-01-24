import React, { useState } from "react";
import { connect } from "react-redux";
import { getCategories } from "../actions/category";
import { getTrips, moreTrips, moreTripsArguments } from "../actions/trip";
import BaseButton from "./BaseButton";
import TripTile from "./TripTile";
import LoadingOverlay from "./LoadingOverlay";
import { Store } from "../types";
import { Trip } from "../../../functions/src/generalTypes";
import NewTrip from "./NewTrip";

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
  const [addingTrip, setAddingTrip] = useState(false);
  return (
    <LoadingOverlay active={loading}>
      <BaseButton clickHandler={() => getTrips() && getCategories()}>
        Refresh
      </BaseButton>
      <BaseButton clickHandler={() => moreTrips({ offset: trips.length })}>
        More
      </BaseButton>
      <ul
        style={{ maxWidth: "52rem" }}
        className="grid grid-cols-3 gap-4 m-auto bg-gray-700 rounded-lg p-4 text-white"
      >
        <li
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 57.81%, rgba(0, 0, 0, 0.17) 100%), url('https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=240&q=80')`
          }}
          className="rounded-lg bg-cover bg-center h-48 w-64 p-4 flex flex-col justify-center items-center cursor-pointer"
          onClick={() => setAddingTrip(true)}
        >
          <div style={{ lineHeight: "0.75" }} className="text-6xl">
            +
          </div>
          <div className="text-2xl">Add trip</div>
        </li>
        {addingTrip ? (
          <div
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)"
            }}
            className="fixed bg-blue-700 rounded-lg p-4"
          >
            <button onClick={() => setAddingTrip(false)}>close</button>
            <NewTrip />
          </div>
        ) : null}
        {loading
          ? "Loading"
          : trips.map(trip => (
              <li key={trip.id} className="h-48 w-64">
                <TripTile trip={trip} />
              </li>
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
  moreTrips,
  getCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(TripsList);
