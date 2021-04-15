import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "../../App/App.css";
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
            <p>Steps on How to Get Started and Use this App:</p>
            <p>Login using the Demo account</p>
            <p> Login Credentials: </p>
            <p>User name: Demo User </p>
            <p>Password: DemoUser2020*</p>
            <p>Upon successful login you will be directed to the google map</p>
            <p>
              The google map accepts search location based on city and state and
              returns locations in those areas
            </p>
            <p>
              Press Enter and each SNAP store location will appear as an
              individual marker
            </p>
            <p>
              Please click on "About" in the header to learn more about SNAP
            </p>
            <p>Click the button below "Get Started" and view the map</p>
            <button onClick={() => this.switchPage("find")}>Get started</button>
          </div>
        </section>
      </div>
    );
  }
}
