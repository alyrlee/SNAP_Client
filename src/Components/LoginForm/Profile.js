import React, { Component } from "react";
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
      console.log('user', resJSON);
      this.setState({
        user: resJSON[0],
      });
      TokenService.saveUserId(this.state.user.id);
    });
  }
  setCard = () => {
    AuthApiService.getProfile().then((resJSON) => {
      const userSavedLocations = resJSON.filter((user_name) => {
        if (user_name === this.state.user_id) {
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
        <div className="profile_page">
          <h3>Welcome to your user account page!</h3>
          <h2>{user.user_name}</h2>
        </div>
        <div className="SavedLocations">
          <h3>Saved Locations</h3>
          <h2>{userSavedLocations}</h2>
        </div>
      </div>
    );
  }
}
