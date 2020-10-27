import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { Hyph } from '../../Utils/Utils';
import TokenService from '../Services/token-service';

export default class NavBar extends Component {
  state={
    clicked: false
  }

handleLogoutClick = () => {
TokenService.clearAuthToken()
TokenService.clearUserName()
}

renderLogoutLink() {
return (
    <div className='NavBar__logged-in'>
    <Link
        onClick={this.handleLogoutClick}
        to='/'>
        Logout
    </Link>
   </div> 
 )
}

renderLoginLink() {
return (
    <div className='NavBar__not-logged-in'>
    <Link
        to='/login'>
        Log in
    </Link>
    <Hyph />
    <Link
        to='/register'>
        Register
   </Link>
  </div> 
 )
}

onClick = () => {
    this.setState({
        clicked: !this.state.clicked
    })
}

render () {
    return (
        <div>
            <ul className="navbar">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/find">Find SNAP retailer</Link></li>
                {/* {TokenService.hasAuthToken() ? <li><Link to='/account'>My Account</Link></li> : null} */}
                {TokenService.hasAuthToken() ? <li><Link to='/'>SNAP Locator</Link></li> : null}
                <li>{TokenService.hasAuthToken()
                    ? this.renderLogoutLink()
                    : this.renderLoginLink()}</li>
                <Link to='/'></Link>
            </ul>
        </div>
    )}
}




