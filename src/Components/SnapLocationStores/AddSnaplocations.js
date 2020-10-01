import React, { Component } from "react";
import axios from "axios"

class AddSnapLocations extends Component {
    constructor(props) {
        super(props);
        this.state = {
                name: '',
                latitude: '',
                longitude: '',
                address: '',
                city: '',
                area: '',
                state: '',
        };
    }

    handleFormSubmit = e => {
        e.preventDefault();
        const name = this.state.name;
        const latitude = this.state.latitude;
        const longitude = this.state.longitude;
        const address = this.state.address;
        const city = this.state.city;
        const area = this.state.area;
        const state = this.state.state;
        const headers = { Authorization: this.props.jwt };
        axios.post(
            "http://localhost:8000/api/stores",
            { name,latitude, longitude, address, city, area, state, headers },
            { headers: headers}
        )
        .then(() => {
            this.setState({
                name: '',
                latitude: '',
                longitude: '',
                address: '',
                city: '',
                area: '',
                state: '',   
            });
            this.props.history.push("/");
        })
        .catch(error => console.log(error));
    };
    handleChange = e=> {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    };
    render() {
        return (
            <React.Fragment>
                <div>
                    <form onSubmit={this.handleFormSubmit}>
                        <h1>Add SNAP retailer or grocer</h1>
                        <label for="name">Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={this.state.name}
                            id="name"
                            onChange={ e => this.handleChange(e)}
                            />
                            {/* <div className="form-group">
                            <label for="type">Type:</label>
                        <select
                            type="text"
                            className="form-control"
                            type="type"
                            Value={this.state.type}
                            id="type"
                            onChange={ e => this.handleChange(e)}
                            >
                             <option> </option>
                             <option> </option>
                             <option> </option>
                            </select>
                            </div> */}
        <div className="form-group">
              <label for="address">Address:</label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={this.state.address}
                onChange={e => this.handleChange(e)}
              />
            </div>
            <div className="form-group">
              <label for="state">State:</label>
              <input
                type="text"
                className="form-control"
                id="state"
                name="state"
                value={this.state.state}
                onChange={e => this.handleChange(e)}
              />
            </div>
            <div className="form-group">
              <h5>Coordinates:</h5>
              <label for="latitude">Latitude:</label>
              <input
                type="text"
                className="form-control"
                id="latitude"
                name="latitude"
                value={this.state.latitude}
                onChange={e => this.handleChange(e)}
              />
            </div>
            <div className="form-group">
              <label for="longitude">Longitude:</label>
              <input
                type="text"
                className="form-control"
                id="longitude"
                name="longitude"
                value={this.state.longitude}
                onChange={e => this.handleChange(e)}
              />
            </div>
            
            <button type="submit" className="tn btn-primary">Submit</button>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default AddSnapLocations;