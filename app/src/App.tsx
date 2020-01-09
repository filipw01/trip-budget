import React, { useEffect } from "react";
import BaseButton from "./components/BaseButton";
import TripsList from "./components/TripsList";
import { getTrips } from "./actions";
import { connect } from "react-redux";
import NewTrip from "./components/NewTrip";
import NewExpense from "./components/NewExpense";
import firebase from "firebase/app";
import "firebase/auth";

interface Props {
  getTrips: Function;
}

const App: React.FC<Props> = ({ getTrips }) => {
  useEffect(() => {
    getTrips();
  }, [getTrips]);

  const signIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => getTrips())
      .catch(function(error) {
        console.error(error);
      });
  };

  return (
    <div>
      <header className="flex flex-col">
        <BaseButton cssClasses="w-24 ml-auto mt-4 mr-4" clickHandler={signIn}>
          Sign in
        </BaseButton>
        <NewTrip />
        <NewExpense />
        <TripsList />
      </header>
    </div>
  );
};

const mapDispatchToProps = {
  getTrips
};

export default connect(null, mapDispatchToProps)(App);
