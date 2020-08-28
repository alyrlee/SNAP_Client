import React, { Component } from 'react';
import TokenService from '../Services/token-service';
import AuthApiService from '../Services/auth-api-service';
import { Link } from 'react-router-dom';
import './LoginForm.css';

class LoginForm extends Component {
  static defaultProps = {
    onValidSignUp: () => {},
    onValidLogin: () => {},

};
    constructor(props) {
      super(props)
      this.state = {
        newUser: true,
        right: 0,
        emailAddress: "",
        password : ""
      }
    }
  
    handleClick(button) {
      if(this.state.newUser && button != 'signUp') {
        this.setState({newUser: false})
      } else if(!this.state.newUser && button != 'signIn') {
        this.setState({newUser: true})
      }
    }
    
    // handle login authentication and validation on submit. //
    handleJwtLoginAuth = e => {
      e.preventDefault();
      const {return_user, return_pass} = e.target;

      this.setState({
          error: null
      });

      AuthApiService.postLogin({
          user_name: return_user.value,
          password: return_pass.value 
      })
          .then(res => {
              return_user.value = '';
              return_pass.value = '';
              TokenService.saveAuthToken(res.authToken);
              this.props.onValidLogin();
          })
          .then(() => {
              window.location=`/my-account`;
          })
          .catch(res => {
              this.setState({
                  error: alert("Invalid username or password. Please double-check your credentials.")
              });
          });
  }
    
    render() {
      return(
             <div className='formContainer'>
                <div className='formHeader'>
                    <div 
                      className={ this.state.newUser ? 'headerActive' : 'headerInActive' } 
                      onClick={() => this.handleClick('signUp')}
                      >
                      <button className='headerButton'> Sign Up </button>
                    </div>
                    <div 
                      className={ this.state.newUser ? 'headerInActive' : 'headerActive' } 
                      onClick={() => this.handleClick('signIn')}
                      >
                      <button className='headerButton'> Sign In </button>
                    </div>
                </div>
                <div className='formBody'>
                  {
                    this.state.newUser ? <SignUp />: <SignIn />
                  }
                </div>
                <div className='formFooter'>
                  <button className='saveForm'> { this.state.newUser ? 'Submit' : 'Login'} </button>
                  {/* handle submit to login or signup. Once either are completed page updates to main screen as user signed in */}
                </div>
             </div>
      ) 
  
    }
  }
  
  
  class SignUp extends Component {
    render() {
      return(      
        <div className='signUpContainer'>
          <h4 className='headerText'>Join Us Today</h4>
          <div className='inputSectionSplit'>
            <input type='text' className='firstName' required/>
            <label className='inputLabel'>First Name</label>
          </div>
          <div className='inputSectionSplit'>
            <input type='text' className='lastName' required/>
            <label className='inputLabel'>Last Name</label>
          </div>
          <div className='inputSection'>
            <input type='text' className='emailAddress' required/>
            <label className='inputLabel'>Email Address</label>
          </div>
          <div className='inputSection'>
            <input type='password' className='password' required/>
            <label className='inputLabel'>Password</label>
          </div>
        </div>
      )
    }
  }
  
  class SignIn extends Component {
    render() {
      return(
        <div className='signInContainer'>
          <h4 className='headerText'>Welcome Back</h4>
          <div className='inputSection'>
            <input type='text' className='userName' required/>
            <label className='inputLabel'>User Name</label>
          </div>
          <div className='inputSection'>
            <input type='text' className='password' required/>
            <label className='inputLabel'>Password</label>
          </div>
          
        </div>
      )
    }
  }
 
export default LoginForm;