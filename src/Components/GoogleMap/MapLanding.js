import React, {Component} from 'react';
import config from '../../config';
// import data from './SnapDataShort';
import MapContainer from '../GoogleMap/GooglePlaces';
import SnapLocationsList from '../SnapLocationStores/SnapLocationsList';

export default class MapLanding extends Component {
  state = {
     SnapLocationsList: [],
     data: SnapLocationsList,
    };

    componentDidMount() {
      const response =  fetch(`${config.API_ENDPOINT}/stores`)
      .then(response => {
        console.log('data', response.json());
        // console.log('data 2',response.data.results);
      });
      this.setState({ SnapLocationsList: response.data.results,
      data: SnapLocationsList});
      console.log('json data', SnapLocationsList);
    }
    // componentDidMount(){
    //   Promise.all([ 
    //     fetch(`${config.API_ENDPOINT}/stores`)
    //   ])
    //   .then(([response]) => {
    //           if(!response.ok)
    //                  return response.json().then(e => Promise.reject(e));
    //                  return Promise.all([response.json()]);
    //   })               
    // //         console.log('data', response.json());
    // //         console.log('data 2',response.data.results);
    // // })
    //   .then([SnapLocationsList]) => {    
    //       this.setState({ SnapLocationsList: response.data.results, data: data});
    //       console.log('json data', data);
		// 	})
    //     .catch(error => {
    //       console.error({error});
    //     });
    // }

    render() {
      return (
        <div className="ui container" style={{ marginTop: '10px' }}>
          {/* <SnapLocationsList stores={this.state.data} />
          Found: {this.state.data.length} SnapLocationsList */}
          <MapContainer 
            SnapLocationsList={this.state.SnapLocationsList.data} 
            // onSelect={this.onSelect} 
            Markers = {this.state.data}
            
         />  
        </div>
      );
    }
  }

   