import React, { useEffect } from "react";
import BaseButton from "./components/BaseButton";
import { getCategories } from "./redux/category";
import { getTrips } from "./redux/trip";
import { connect } from "react-redux";
import firebase from "firebase/app";
import "firebase/auth";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Trips from "./routes/Trips";
import Trip from "./routes/Trip";
import MessagesHandler from "./components/MessagesHandler";

interface Props {
  getTrips: Function;
  getCategories: Function;
}

const App: React.FC<Props> = ({ getTrips, getCategories }) => {
  useEffect(() => {
    getTrips();
    getCategories();
  }, [getTrips, getCategories]);

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
    <BrowserRouter>
      <header className="flex flex-col">
        <nav>
          <BaseButton cssClasses="w-24 ml-auto mt-4 mr-4" clickHandler={signIn}>
            Sign in
          </BaseButton>
          settings
        </nav>
      </header>
      <MessagesHandler />
      <div>
        <Switch>
          <Route path="/trip">
            <Trip />
          </Route>
          <Route path="/">
            <Trips />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

const mapDispatchToProps = {
  getTrips,
  getCategories
};

export default connect(null, mapDispatchToProps)(App);
