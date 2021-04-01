import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./LandingPage.css";
import TokenService from "../Services/token-service";

export default class LandingPage extends Component {
  state = {
    redirect: false,
    where: "",
  };
  switchPage = (link) => {
    if (link === "Home" && TokenService.hasAuthToken()) {
      link = "LandingPage";
    }
    this.setState({
      redirect: !this.state.redirect,
      where: link,
    });
    return;
  };
  render() {
    const { redirect, where } = this.state;

    if (redirect) {
      return <Redirect to={`/${where}`} />;
    }

    return (
      <div>
        <section className="banner">
          <div className="Cover">
            <h2>SNAP Locator</h2>
            <p>Connect with SNAP retailers and locations in your area</p>
            <h3>Steps on How to Get Started and Use this App:</h3>
            <h3>Login using the Demo account</h3>
            <h3>The Login Credentials for the user name is Demo User and the password is DemoUser2020*</h3>
            <h3>Upon successful login you will be directed to the google map</h3>
            <h3>The google map accepts search location based on city and state search input and returns locations in those areas </h3>
           <h3>Press Enter and each SNAP store location will appear as an individual marker with information</h3>
           <h1>Please click on "About" in the header to learn more about SNAP</h1>
           <h1>You may click the button below "Get Started" to view the map</h1>
            <button onClick={() => this.switchPage("find")}>Get started</button>
          </div>
        </section>
      </div>
    );
  }
}
