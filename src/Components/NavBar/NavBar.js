import React, { Component } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
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

    // const{clicked} = this.state

    return (
        <div>

            {/* <Hamburger display={clicked} click={this.onClick} 
            status={ TokenService.hasAuthToken() ? <Link onClick={this.handleLogoutClick} to='/'>Logout</Link> : <Link to='/login'>Log in</Link>}/> */}

            <ul className="navbar">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/find">Find SNAP retailer</Link></li>
                {TokenService.hasAuthToken() ? <li><Link to='/account'>My Account</Link></li> : null}
                <li>{TokenService.hasAuthToken()
                    ? this.renderLogoutLink()
                    : this.renderLoginLink()}</li>
                <Link to='/'></Link>
            </ul>
        </div>
    )
}
}




