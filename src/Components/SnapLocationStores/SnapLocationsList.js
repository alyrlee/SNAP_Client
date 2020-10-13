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
            snapLocationsList.map.forEach((SLL) => {
                if (snapLocationsList) {
                    snapLocationsList.map.forEach(SLL => {
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
            {/* >  */}

{/* snapLocationsList: { snap_locations: { ObjectId: number; Store_Name: string; Address: string;Address_Line__2: any; City: string; State: string; Zip5: string; Zip4: string; County: string; Longitude: number;Latitude: number;}[]; */}
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