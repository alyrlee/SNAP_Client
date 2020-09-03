import React, { Component } from "react";
import ErrorValidation from '../../ErrorHandlers/ErrorValidation'
import AuthApiService from '../Services/auth-api-service';
import "./LoginForm.css";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

export default class LoginForm extends Component {
  //static default props = {
  //   onFormValid: () => {}
  // };

  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      validUserName: false,
      valiedPass: false,
      validConfirm: false,
      validRegistration: false,

      // formErrors: {
      //   firstName: "",
      //   lastName: "",
      //   userName: "",
      //   email: "",
      //   password: "",
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        User Name: ${this.state.userName}
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

validateLoginForm() {
  const { userName, password, validConfirm } = this.state;

  this.setState({
    validRegistration: {userName, password, validConfirm}
  });
}

updateUsername(username) {
  this.setState({
      username: username,
  },
      this.validateUsername
  );
}

updatePassword(password) {
  this.setState({
      password: password,
  },
      this.validatePassword
  );
}

confirmPassword(retypePass) {
  this.setState({
      retypePass: retypePass,
  },
      this.validateConfirmedPassword
  );
}

validateUsername() {
  const {userName} = this.state;
  let validUserName = true;
  let errorType = {...this.state.errorType};

  if (userName.length < 3) {
      validUserName = false;
      errorType.userName = "Please create a username that is longer than 3 characters.";
  }

  this.setState({
      validUserName,
      errorType,
  },
      this.validateRegistrationForm
  );
}

validatePassword() {
  const {password} = this.state;
  const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])[\S]+/;
  let validPass = true;
  let errorType = {...this.state.errorType};

  if (password.length < 8) {
      validPass = false;
      errorType.password = "Password must be at least 8 characters long.";
  }

  if (password.length > 72) {
      validPass = false;
      errorType.password = "Password must be less than 72 characters long.";
  }

  if (password.startsWith(' ') || password.endsWith(' ')) { 
      validPass = false;
      errorType.password = "Password must not start or end with a space.";
  }

  if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      validPass = false;
      errorType.password = "Include 1 upper case letter, lower case letter, number, and special character.";
  }

  this.setState({
      validPass,
      errorType,
  },
      this.validateRegistrationForm
  );
}

validateConfirmedPassword() {
  const {retypePass} = this.state;
  const {password} = this.state;
  let validConfirm = true;
  let errorType = {...this.state.errorType};

  if (password !== retypePass) {
      validConfirm = false;
      errorType.retypePass = "Passwords do not match.";
  }

  this.setState({
      validConfirm,
      errorType
  },
      this.validateRegistrationForm
  );
}

submitRegistration = e => {
  e.preventDefault();
  const {username, password} = e.target; 

  this.setState({
      error: null
  });

  AuthApiService.postUser({
      user_name: username.value,
      password: password.value
  })
      .then(user => {
          username.value = '';
          password.value = '';
          this.props.onValidlRegistration();
      })
      .then(() => {
          window.location=`/login`;
          window.alert('Registered successfully. Please log in with your new credentials.');
      })
      .catch(res => {
          this.setState({
              error: window.alert('An unexpected error occurred. Please try again later.')
          });
      });
}    



  // handleChange = e => {
  //   e.preventDefault();
  //   const { name, value } = e.target;
  //   let formErrors = { ...this.state.formErrors };

  //   switch (name) {
  //     case "firstName":
  //       formErrors.firstName =
  //         value.length < 3 ? "minimum 3 characaters required" : "";
  //       break;
  //     case "lastName":
  //       formErrors.lastName =
  //         value.length < 3 ? "minimum 3 characaters required" : "";
  //       break;
  //     case "email":
  //       formErrors.email = emailRegex.test(value)
  //         ? ""
  //         : "invalid email address";
  //       break;
  //     case "password":
  //       formErrors.password =
  //         value.length < 6 ? "minimum 6 characaters required" : "";
  //       break;
  //     default:
  //       break;
  //   }

  //   this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  // };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
               
                placeholder="First Name"
                type="text"
                name="firstName"
                noValidate
                onChange={this.handleChange}
              />
              </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                placeholder="Last Name"
                type="text"
                name="lastName"
                noValidate
                onChange={this.handleChange}
              />
            </div>
            <div className="userName">
              <label htmlFor="userName">Last Name</label>
              <input
               
                placeholder="User Name"
                type="text"
                name="userName"
                noValidate
                onChange={this.handleChange}
              />
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
            </div>
            <div className="createAccount">
              <button type="submit">Submit</button>
              <small>Already Have an Account?</small>
              {/* sign in page */}
            </div>
          </form>
        </div>
      </div>
    );
  }
}


