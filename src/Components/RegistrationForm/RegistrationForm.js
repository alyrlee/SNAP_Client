import React, { Component } from "react";
import { Link } from 'react-router-dom';
import ErrorValidation from '../../ErrorHandlers/ErrorValidation'
import AuthApiService from '../Services/auth-api-service';
import "./RegistrationForm.css";


export default class RegistrationForm extends Component {
  static defaultProps = {
    onFormValid: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      validUserName: false,
      validPass: false,
      validConfirm: false,
      validRegistration: false,
      errorType: {}
    };
  };

  handleSubmit = ev => {
    ev.preventDefault()
    const { user_name, password } = ev.target

    console.log('registration form submitted')
    console.log({user_name, password })
  };
    

validateRegistrationForm() {
  const { validUserName, validPass, validConfirm } = this.state;

  this.setState({
    validRegistration: validUserName && validPass && validConfirm
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
  const {username} = this.state;
  let validUserName = true;
  let errorType = {...this.state.errorType};

  if (username.length < 3) {
      validUserName = false;
      errorType.username = "Please create a username that is longer than 3 characters.";
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
          this.props.onFormValid();
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
  render() {
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form onSubmit={this.submitRegistration}>
            <div className="userName">
              <label htmlFor="username">Last Name</label>
              <input
                onChange={e => this.updateUsername(e.target.value)}
                placeholder="User Name"
                type="text"
                id="username"
                name="username"
                value={this.username}
              />
               <ErrorValidation 
                className="Username_Error"
                valid={this.state.validName}
                message={this.state.errorType.username}/>
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                onChange={e => this.updatePassword(e.target.value)}
                placeholder="Password"
                type="password"
                name="password"
              />
               <ErrorValidation 
                className="Password_Error"
                valid={this.state.validPass}
                message={this.state.errorType.password}/>
            </div>
            
           <div className = "retype-password">
            <label htmlFor="retype-password">
                            
            <p id="confirm-descrip"></p>

            <input 
                onChange={e => this.confirmPassword(e.target.value)}
                type="password" 
                id="retype-password" 
                placeholder="Re-type password"
                name="re-type-password"/>
            <ErrorValidation 
                className="Retype_Error"
                valid={this.state.validConfirm}
                message={this.state.errorType.retypePass}/>
            </label>     
            </div>                                     
            <div className="createAccount">
              <button type="submit" id="register-user"> Submit</button>
              <Link to="/login">
              <small>Already Have an Account?</small>
                </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


