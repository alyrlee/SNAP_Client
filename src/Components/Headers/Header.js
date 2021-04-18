import React, { Component } from "react";
import "../../App/App.css";
import { Link } from "react-router-dom";

export default class Header extends Component {
  state = {
    clicked: false,
  };

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
          <Link to="/"></Link>
        </ul>
      </div>
    );
  }
}
