import React, { Component } from "react";
import MapContainer from "../GoogleMap/GooglePlaces";

class SnapLocationsList extends Component {
  static defaultProps = {
      snapLocationsList: []
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
                        <div key={SLL.store_name} className="placename"> 
                              <h1 to={`/stores/${SLL.store_name}`}>
                                  <h2>{SLL.name}</h2> 
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