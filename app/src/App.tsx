import React, { useEffect } from "react";
import BaseButton from "./components/BaseButton";
import TripsList from "./components/TripsList";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";
import { getTrips } from "./actions";
import { connect } from "react-redux";
import NewTrip from "./components/NewTrip";

interface Props {
  getTrips: Function;
}

const App: React.FC<Props> = ({ getTrips }) => {
  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
  }, []);

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
        <BaseButton cssClasses="w-24 ml-auto mt-4 mr-4" clickHandler={signIn}>Sign in</BaseButton>
        <NewTrip />
        <TripsList />
      </header>
    </div>
  );
};

const mapDispatchToProps = {
  getTrips
};

export default connect(null, mapDispatchToProps)(App);
