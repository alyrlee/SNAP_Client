import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "../../App/App.css";

export default class LandingPage extends Component {
  state = {
    redirect: false,
    where: "",
  };

  switchToHomePage = () => {
    this.setState({
      redirect: !this.state.redirect,
      where: 'LandingPage',
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
            <button onClick={this.switchToHomePage}>Get started</button>
          </div>
        </section>
      </div>
    );
  }
}
