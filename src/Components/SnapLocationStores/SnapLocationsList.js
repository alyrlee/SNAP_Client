import React, { Component } from "react";
import MapContainer from "../GoogleMap/GooglePlaces";

class SnapLocationsList extends Component {
  static defaultProps = {
      snapLocationsList: {}
}; 

render() {
  //destructuring 
  const { snapLocationsList } = this.props;
  console.log(typeof snapLocationsList);
  return (
        <React.Fragment>
          <div className="snap_locations_list"> { 
            snapLocationsList.map((SLL) => {
                if (snapLocationsList) {
                    snapLocationsList.map(SLL => {
                      return (
                        <div key={SLL.Store_Name} className="placename">
                        {SLL.ObjectId}
                        {SLL.Address}
                        {SLL.Address_Line_2}
                        {SLL.City}
                        {SLL.State}
                        {SLL.Zip5}
                        {SLL.Zip4}
                        {SLL.County}
                        {SLL.Longitude}
                        {SLL.Latitude}            
                              <h1 to={`/stores/${SLL.Store_Name}`}>
                                  <h2>{SLL.Store_Name}</h2> 
                              </h1> 
                        </div>
                      );
                    })}
            })} 
          </div>    
          <div className="snapmap"> 
            <MapContainer snapLocationsList={snapLocationsList} />
          </div> 
        </React.Fragment>
            
  );
  } 
} 
                       
export default SnapLocationsList;