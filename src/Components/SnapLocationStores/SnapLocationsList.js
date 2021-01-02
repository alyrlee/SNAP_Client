import React, { Component} from 'react';
//initialize as an empty array
//this.state, have to pass in props

class SnapLocationsList extends Component {
  static defaultProps = {
    snapLocationsList: []
  };
render() {
  const { snapLocationsList } = this.props;
  console.log(typeof snapLocationsList);
  return (
        <React.Fragment>
          <div className="snap_locations_list"> { 
            this.props.snapLocationsList.map((SLL) => {
                // if (snapLocationsList) {
                //     this.props.snapLocationsList.map(SLL => {
                  console.log('store info', SLL)
                      return (
                        <div key={SLL.Store_Name} className="placename">       
                        </div>
                      );
                 })}
            
          </div>    
          <div className="snapmap"> 
          </div> 
        </React.Fragment>        
    );
  } 
}  


// props.snapLocationsList&& props.snapLocationsList.map()

// const SnapLocationsList = props => {
//   const snapLocationsList = props.snapLocationsList.map(Store_Name => {
//     return  <ul>{Store_Name&& Store_Name.map(Store_Name => <li key={Store_Name.objectid}>{Store_Name.Store_Name}</li>)}</ul>;
//   });
//   return <div className="snapLocationsList">{snapLocationsList}</div>;
// }; 
                       
export default SnapLocationsList;

