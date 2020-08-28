import React, { Component } from 'react';
import '../About/About.css'
import Navbar from '../NavBar/NavBar';

export default class About extends Component {
    render(){
        return (
            <div>
             <Navbar />
            <section className="banner"> 
                <div className="Cover">
            <h2>SNAP Locator</h2>
            <p>Connect with SNAP retailers and locations in your area</p>
            <p>SNAP Store locator is an application that helps users find access to SNAP retailers and grocers.</p>
            <p> communities suffer disproportionately from illness related to 
            lack of access to fresh and healthy foods.</p>
            <p>SNAP Store Locator will allow the user to search for retailers and grocers nearby that accept SNAP benefits and also provide a list of 
            food items that are sold.</p>
           <p> SNAP stands for the Supplemental Nutrition Assistance Program mandated by the Federal Government and supervised by states to help millions of individuals and families who need 
            financial assistance to buy food. Formerly known as the Food Stamp Program, SNAP provides an economic benefit as well as serving to eliminate hunger. </p>
            </div>
           </section>
           </div>
        );
    }
}
