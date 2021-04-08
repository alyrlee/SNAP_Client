import React, { Component } from "react";
import "../../App/App.css";
import { Link } from "react-router-dom";
import TokenService from "../Services/token-service";

export default class Header extends Component {
  state={
    clicked: false
}

  handleLogoutClick = () => {
    TokenService.clearAuthToken();
  };

  renderLogoutLink() {
    return (
        <div className='header-bar__logged-in'>
          <Link onClick={this.handleLogoutClick} to="/">
            Logout
          </Link>
        </div>
    );
  }

  renderLoginLink() {
    return (
        <div className='header-bar__not-logged-in'>
          <Link to="/login"> Log in</Link>
        </div>
    );
  }

  onClick = () => {
    this.setState({
      clicked: !this.state.clicked,
    });
  };

  render() {
    return (
        <div>
          <ul className="header-bar">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/find">Map</Link>
            </li>
            {TokenService.hasAuthToken() ? (
              <li>
                <Link to="/"></Link>
              </li>
            ) : null}
            <li>
              {TokenService.hasAuthToken()
                ? this.renderLogoutLink()
                : this.renderLoginLink()}
            </li>
            <Link to="/"></Link>
          </ul>
        </div>
    );
  }
}

//https://stackoverflow.com/questions/50025717/jest-enzyme-invariant-violation-you-should-not-use-route-or-withrouter-ou
