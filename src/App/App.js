import React, { Component } from "react";
import "./App.css";
import Header from "../Components/Headers/Header";
import LandingPage from "../Components/LandingPage /LandingPage";
import LoginForm from "../Components/LoginForm/LoginForm";
import PrivateRoute from "../Utils/PrivateRoute";
import PublicOnlyRoute from "../Utils/PublicOnlyRoute";
import About from "../Components/About/About";
import Profile from "../Components/LoginForm/Profile";
import MapLanding from "../Components/GoogleMap/MapLanding";
import { Router, Route, Switch } from "react-router-dom";
import history from "../Contexts/history.js";

class App extends Component {
  state = {
    hasError: false,
    snapLocationsList: [],
  };

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <header className="App__header">
            {" "}
            <Header />
          </header>
          <main className="App__main">
            {this.state.hasError && (
              <p className="red">There was an error! Oh no!</p>
            )}
            <Switch>
              <Route exact path={"/"} component={LandingPage} />
              <Route exact path={"/about"} component={About} />
              <Route exact path={"/find"} component={MapLanding} />
              <PublicOnlyRoute path={"/login"} component={LoginForm} />
              <PrivateRoute path={"/profile"} component={Profile} />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
