import React, { Component } from "react";
import Header from "../Headers/Header";
import TokenService from "../Services/token-service";
import AuthApiService from "../Services/auth-api-service";

export default class Profile extends Component {
  state = {
    user: {
      user_name: "",
      id: [],
    },
    userSavedLocations: [],
  };
  componentDidMount() {
    AuthApiService.getProfile().then((resJSON) => {
      this.setState({
        user: resJSON,
      });
      TokenService.saveUserId(this.state.user.id);
    });
  }
  setCards = () => {
    AuthApiService.getAllUserProfiles().then((resJSON) => {
      const userSavedLocations = resJSON.filter((user_name) => {
        if (user_name === this.state.user.id) {
          return user_name;
        }
        return resJSON;
      });
      this.setState({
        userSavedLocations: userSavedLocations,
      });
    });
  };
  render() {
    const { user, userSavedLocations } = this.state;
    return (
      <div>
        <Header />
        <div className="profile_page">
          <h3>Welcome, to your user account page!</h3>
          <h2>{user.user_name}</h2>
        </div>
        <div className="SavedLocations">
          <h3>Saved Locations</h3>
          {user.userSavedLocations}
          {userSavedLocations}
        </div>
      </div>
    );
  }
}
