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
        
      <form
        className='Login'
        onSubmit={this.handleSubmitJwtAuth}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='user_name'>
          <label htmlFor='username'>
            User name
          </label>
          <Input
            required
            name='user_name'
            id='LoginForm__user_name'>
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
            id='LoginForm__password'>
          </Input>
        </div>
        <Button type='submit'>
          Login
        </Button>
      </form>
    )
  }
}



// import React, { Component } from 'react'
// import { Section } from '../../Utils/Utils'

// export default class LoginForm extends Component {
//     static defaultProps = {
//       onLoginSuccess: () => {}
//     }
  
//     state = { error: null }

//   handleLoginSuccess = () => {
//     const { location, history } = this.props
//     const destination = (location.state || {}).from || '/'
//     history.push(destination)
//   }

//   render() {
//     return (
//       <Section className='Login'>
//         <h2>Login</h2>
//         <LoginForm
//           onLoginSuccess={this.handleLoginSuccess}
//         />
//       </Section>
//     )
//   }
// }


// import React, { Component } from "react";
// import { Link, } from 'react-router-dom';
// import config from '../../config'
// // import { Button, Input } from '../../Utils/Utils'
// import { Redirect } from 'react-router-dom';
// // import Header from '../Headers/Header';
// import TokenService from '../Services/token-service';
// import AuthApiService from '../Services/auth-api-service';
// import history from '../../Contexts/history'
// import './LoginForm.css';

// export default class LoginForm extends Component { 
//     static defaultProps = {
//         onValidLogin: () => {}
//     };

//     state = { error: null }
   
//   handleJwtLoginAuth = ev => {
//         ev.preventDefault()
//         this.setState({ error: null })
//         const { user_name, password } = ev.target

//         console.log('login form submitted')
//         console.log({ user_name, password })
     
//         AuthApiService.postLogin({
//           user_name: user_name.value,
//           password: password.value,
//         })
//         .then(res => {
//           TokenService.saveUserName(user_name.value)
//             user_name.value = ''
//             password.value = ''
//           TokenService.saveAuthToken(res.authToken)
//           fetch(`${config.API_ENDPOINT}/users/${TokenService.getUserName()}`, {
//             headers: {'authorization': `bearer ${TokenService.getAuthToken()}`},})
//               .then(res =>
//                   (!res.ok)
//                       ? res.json().then(e => Promise.reject(e))
//                       : res.json()
//               )
//               .then(resJSON => {
//                 TokenService.saveUserId(resJSON.id)})
//           history.push('/')
//         })
//         .catch(res => {
//           this.setState({ error: res.error })
//         })
//     }
//     state = {
//         redirect: false,
//         where: ''
//     }
//     switchPage = ( link ) => {
//         if (link === 'Home' && TokenService.hasAuthToken()){
//             link = 'LandingPage'
//         }
//         this.setState({
//             redirect: (!this.state.redirect),
//             where: link
//         })
//         return;
//     }
//     render() {
//         const { redirect, where } = this.state;
//         if (redirect) {
//           return <Redirect to={`/${where}`}/>
//         }

//     // render() {
//         return (
//       
//             <h1>Log In</h1>
//               <form onSubmit={this.handleJwtLoginAuth}> 
//               {/* <form onSubmit={this.handleSubmitBasicAuth}> */}

//         <div className="userName">
//           <label htmlFor="username">Last Name</label>
//               <input
//                   placeholder="User Name"
//                   type="text"
//                   id="username"
//                   name="username"
//                   value={this.userName}
//               />
//         </div>

//         <div className="password">
//           <label htmlFor="password">Password</label>
//               <input 
//                 placeholder="Password"
//                 type="password" 
//                 id="return-pass" 
//                 name="return_pass"
//             />
//        </div>  

//         <div className="demoLogin">
//            <button type="submit">LogIn</button>               
//                  Demo User: DemoUser2020
//                  Demo Password: DemoUser2020*
//         </div>

//          <Link to='/register'>
//            <small>Back to Create Account</small>
//           </Link>
          
//           </form>
//         </div>
//       </div>
            
//     );
//   }
// }