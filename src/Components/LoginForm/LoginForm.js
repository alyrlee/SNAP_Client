import React, { Component } from 'react';
import config from '../../config';
import TokenService from '../Services/token-service';
import AuthApiService from '../Services/auth-api-service';
import {Link} from 'react-router-dom';
import history from '../../Contexts/history';
// import { Button, Input } from '../../Utils/Utils'

export default class LoginForm extends Component {
  state = { error: null }

  handleSubmitJwtAuth = ev => {
    ev.preventDefault()
    this.setState({ error: null })
    const { user_name, password } = ev.target

    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
      .then(res => {
    TokenService.saveUserName(user_name.value)
        user_name.value = ''
        password.value = ''
    TokenService.saveAuthToken(res.authToken)
      fetch(`${config.API_ENDPOINT}/profile/${TokenService.getUserName()}`, {
      headers: {'authorization': `bearer ${TokenService.getAuthToken()}`},})
      .then(res => {
        console.log('response', res)
       return (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
        })
        .then(resJSON => {
              TokenService.saveUserId(resJSON.id)})
        history.push('/profile')
      })
      .catch(res => {
        console.log('error has occurred',res.error);
        // this.setState({ error: res.error })
        this.setState({ error:'an error has occurred' })
      })
  }

  render() {
    const { error } = this.state
    return (
        <div className="wrapper">
            <div className="form-wrapper">
          <h1>Login</h1>    
      <form
        className='Login'
        onSubmit={this.handleSubmitJwtAuth}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='userName'>
          <label htmlFor='username'> User Name</label>
          <input
            required
            name='user_name' 
            id='username'
            placeholder="User Name"
            type="text">
          </input>
        </div>
        <div className='password'>
          <label htmlFor='password'>Password</label>
          <input
            required
            name='password'
            placeholder="Password"
            type="password"
            id='password'>
          </input>
        </div>
        <div className="demoLogin">
        <button type="submit" id="submit-login">Login</button>
                 <h4>Demo User: DemoUser2020</h4>
                 <h4>Demo Password: DemoUser2020*</h4>
    </div>
                    <Link to='/register'>
                        <small>Back to Create Account</small>
                    </Link>    
    </form>
    </div>
    </div>  
    ); 
  }
}