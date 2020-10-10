import React, { Component } from "react";
import MapContainer from "../GoogleMap/GooglePlaces";

class SnapLocationsList extends Component {
  static defaultProps = {
      snapLocationsList: []
}; 

 render() {
    const { snapLocationsList } = this.props;
      console.log(typeof snapLocationsList);
      return (
           <React.Fragment>
             <div className="snaplocationslist"> {
                this.props.snapLocationsList.map((SLL) => {
                   if (this.props.snapLocationsList) {
                        this.props.snapLocationsList.map(SLL => {
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
               <MapContainer snapLocationsList={this.props.snapLocationsList} />
                </div> 
          </React.Fragment>
               
           );
         } 
       } 
                       
      export default SnapLocationsList;