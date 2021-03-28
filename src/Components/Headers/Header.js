import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { Hyph } from '../../Utils/Utils';
import TokenService from '../Services/token-service';
import {Router} from 'react-router-dom';

export default class NavBar extends Component {
 
handleLogoutClick = () => {
TokenService.clearAuthToken()
}

renderLogoutLink() {
return (
    <div>
        <Link onClick={this.handleLogoutClick} to='/'> Logout</Link>
   </div> 
 )
}

renderLoginLink() {
    return (
        <div>
            <Link to='/login'> Log in</Link>
            <Hyph />
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
                {TokenService.hasAuthToken() ? <li><Link to='/profile'>My Account</Link></li> : null}
                {TokenService.hasAuthToken() ? <li><Link to='/'>SNAP Locator</Link></li> : null}
                <li>{TokenService.hasAuthToken()
                    ? this.renderLogoutLink()
                    : this.renderLoginLink()}</li>
                <Link to='/'></Link>
            </ul>
        </div>
    )}
}
