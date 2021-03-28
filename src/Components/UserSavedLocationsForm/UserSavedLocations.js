import React, { Component } from "react";
import snapLocatorContext from "../../Contexts/snapLocatorContext";
import AuthApiService from "../Services/auth-api-service";

export default class UserSavedLocationsForm extends Component {
  static contextType = snapLocatorContext;

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { stores } = this.context;
    const { text } = ev.target;
    AuthApiService.postStores(stores, text.value)
      .then(this.context.addStores)
      .then(() => {
        text.value = "";
      })
      .catch(this.context.setError);
  };

  render() {
    return <div></div>;
  }
}