import React, { Component } from "react";
import { Link, } from 'react-router-dom';
import { Button, Input } from '../../Utils/Utils'
import { Redirect } from 'react-router-dom';
// import Header from '../Headers/Header';
import TokenService from '../Services/token-service';
import AuthApiService from '../Services/auth-api-service';
import './LoginForm.css';

export default class LoginForm extends Component { 
    static defaultProps = {
        onValidLogin: () => {}
    };

    state = { error: null }
   
  handleJwtLoginAuth = ev => {
        ev.preventDefault()
        this.setState({ error: null })
        const { userName, password } = ev.target

        console.log('login form submitted')
        console.log({ userName, password })
     
        AuthApiService.postLogin({
          userName: userName.value,
          password: password.value,
        })
          .then(res => {
            userName.value = ''
            password.value = ''
            TokenService.saveAuthToken(res.authToken)
            this.props.onLoginSuccess()
          })
          .catch(res => {
            this.setState({ error: res.error })
          })
      }

    state = {
        redirect: false,
        where: ''
    }
    switchPage = ( link ) => {
        if (link === 'Home' && TokenService.hasAuthToken()){
            link = 'LandingPage'
        }
        this.setState({
            redirect: (!this.state.redirect),
            where: link
        })
        return;
    }
    render() {
        const { redirect, where } = this.state;
        if (redirect) {
          return <Redirect to={`/${where}`}/>
        }

    // render() {
        return (
        <div className="wrapper">
        <div className="form-wrapper">
            <h1>Log In</h1>
              <form onSubmit={this.handleJwtLoginAuth}> 
              {/* <form onSubmit={this.handleSubmitBasicAuth}> */}

        <div className="userName">
          <label htmlFor="username">Last Name</label>
              <input
                  placeholder="User Name"
                  type="text"
                  id="username"
                  name="username"
                  value={this.username}
              />
        </div>

        <div className="password">
          <label htmlFor="password">Password</label>
              <input 
                placeholder="Password"
                type="password" 
                id="return-pass" 
                name="return_pass"
            />
       </div>  

        <div className="demoLogin">
          <button type="submit" id="submit-login" onClick={() => this.switchPage('home')}>Login</button>
                 Demo User: DemoUser2020
                 Demo Password: DemoUser2020*
        </div>

         <Link to='/'>
           <small>Back to Create Account</small>
          </Link>
          
          </form>
        </div>
      </div>
            
    );
       }
}