import React, { useEffect, useRef } from "react";
import BaseButton from "./components/BaseButton";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";
import { createTrip, deleteTrip, getTrips } from "./actions";
import { connect } from "react-redux";

interface Props {
  trips: any;
  createTrip: Function;
  deleteTrip: Function;
  getTrips: Function;
}

const App: React.FC<Props> = ({ trips, createTrip, deleteTrip, getTrips }) => {
  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
    getTrips();
  }, [getTrips]);
  const textField = useRef<HTMLInputElement>(null);

  const signIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .catch(function(error) {
        console.error(error);
      });
    getTrips();
  };

  return (
    <div>
      <header className="flex flex-col">
        <BaseButton clickHandler={signIn}>Sign in</BaseButton>
        <br />
        <div className="h-8 mb-4 flex justify-around">
          <input
            className="border-2 border-black rounded-lg h-full"
            type="text"
            ref={textField}
          />
          <BaseButton
            clickHandler={() =>
              createTrip({
                tripName: textField?.current?.value,
                dateStart: "today",
                dateEnd: "tomorrow",
                town: "London"
              })
            }
          >
            Create Trip
          </BaseButton>
          <BaseButton
            clickHandler={() => deleteTrip(textField?.current?.value)}
          >
            Delete Trip
          </BaseButton>
        </div>
        {trips.map((trip: any) => (
          <div key={trip.tripName}>{trip.tripName}</div>
        ))}
      </header>
    </div>
  );
};

const mapStateToProps = (state: any) => ({ trips: state.trips });

const mapDispatchToProps = {
  createTrip,
  deleteTrip,
  getTrips
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
