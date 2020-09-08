import React, { Component } from "react";
import { Link } from 'react-router-dom';
// import NavBar from '../NavBar/NavBar';
import TokenService from '../Services/token-service';
import AuthApiService from '../Services/auth-api-service';
import './LoginForm.css';

export default class LoginForm extends Component { 
    static defaultProps = {
        onValidLogin: () => {}
    };
    constructor(props) {
        super(props);
    };

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
                window.location=`/profile`;
            })
            .catch(res => {
                this.setState({
                    error: alert("Invalid username or password. Please double-check your credentials.")
                });
            });
    }

    render() {
        return (
        <div className="wrapper">
        <div className="form-wrapper">
            <h1>Log In</h1>
              <form onSubmit={this.handleJwtLoginAuth}> 

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
                <button type="submit" id="submit-login">Login</button>
                 <button>Demo User: DemoUser2020</button>
                <button>Demo Password: DemoUserSnap1234!</button>
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