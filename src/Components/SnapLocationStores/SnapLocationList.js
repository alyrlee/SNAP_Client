import React, { Component } from "react";
import MapContainer from "../GoogleMap/GooglePlaces";

class snapLocationsList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="snaplocationsist">
          {this.props.snapLocationsList.map(lsnapLocationsList => {
            return (
              <div key={snapLocationsList._id} className="placename">
                <h1 to={`/snaplocations/${snapLocationsList._id}`}>
                  <h2>{lsnapLocationsList.name}</h2>
                  <p></p>
                </h1>
              </div>
            );
          })}
        </div>
        <div className="snapmap">
          <MapContainer snapLocationsList={this.props.snapLocationsList} />
        </div>
      </React.Fragment>
    );
  }
}

export default snapLocationsList;