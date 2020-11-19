import React, { Component } from 'react'
import TokenService from '../Services/token-service'
import AuthApiService from '../Services/auth-api-service'
import { Button, Input } from '../../Utils/Utils'

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  }

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
        user_name.value = ''
        password.value = ''
        TokenService.saveAuthToken(res.authToken)
        this.props.onLoginSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
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
          <label htmlFor='username'>
            User name
          </label>
          <Input
            required
            name='user_name'
            id='username'>
          </Input>
        </div>
        <div className='password'>
          <label htmlFor='password'>
            Password
          </label>
          <Input
            required
            name='password'
            type='password'
            id='password'>
          </Input>
        </div>
        <Button type='submit'>
          Login
        </Button>
        </form>
        </div>
    </div>  
    ); 
  }
}