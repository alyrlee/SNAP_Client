import React, { Component } from "react";
import TokenService from "../Services/token-service";
import AuthApiService from "../Services/auth-api-service";
import "../LoginForm/LoginForm.css";
import history from "../../Contexts/history";

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {},
  };

  state = { error: null };

  handleSubmitJwtAuth = (ev) => {
    ev.preventDefault();
    this.setState({ error: null });
    const { user_name, password } = ev.target;

    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
      .then((res) => {
        user_name.value = "";
        password.value = "";
        TokenService.saveAuthToken(res.authToken);
        this.props.onLoginSuccess();
      })
      .then(() => history.push("/profile"))
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Login</h1>
          <form className="Login" onSubmit={this.handleSubmitJwtAuth}>
            <div role="alert">{error && <p className="red">{error}</p>}</div>
            <div className="userName">
              <label htmlFor="username"> User Name</label>
              <input
                required
                name="user_name"
                id="username"
                placeholder="User Name"
                type="text"
              ></input>
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                required
                name="password"
                placeholder="Password"
                type="password"
                id="password"
              ></input>
            </div>
            <div className="demoLogin">
              <button type="submit" id="submit-login">
                Login
              </button>
              <h4>Demo User: DemoUser2020</h4>
              <h4>Demo Password: DemoUser2020*</h4>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
