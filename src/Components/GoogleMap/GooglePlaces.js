import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import SnapLocationsList from '../SnapLocationStores/SnapLocationsList';
import snapLocationsListContext from '../../Contexts/snapLocationsListContext';
import config from '../../config'

const mapStyles = {
  width: "100%",
  height: "100%",
  position: 'relative',
};

export class MapContainer extends Component {
  static contextType = snapLocationsListContext
  constructor(props) {
    super(props);
    this.state = { 
      type: null, 
      stores: {},
      snapLocationsList: {},
    };
  } 

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/stores`)
      .then(response => {
        console.log('About to check for errors');
        if(!response.ok) {
          console.log('An error did occur, let\'s throw an error.');
          console.log(response);
          throw new Error('Something went wrong');
        }
        return response; 
      })
      .then(response => response.json())
      .then(stores => {
        const snapLocationsList = Object.keys(stores)
              .map(key => stores[key].item[0]);
        this.setState({
          snapLocationsList: snapLocationsList
        });
      })
      .catch(err => {
        console.log('Handling the error here.', err);
      });
  }
  // onMapReady = (map) => this.searchNearby(map, map.center);
  onMapReady = (map) => this.querySelector(map, map.center);

  // searchNearby = (map, center) => {        
  //   const { google } = this.props;

  querySelector = (map, center) => {
    const { google } = this.props;
    
    const service = new google.maps.places.PlacesService(map);

    // Specify location, radius and place types for your Places API search.
    const request = {
      location: center,
      radius: '500',
      type: ['stores']
    };

    service.querySelector(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK)
        this.setState({ places: results });
    });
  };

  render() {
    ///type js here, before the return 
    console.log(this.props.snapLocationsList);
    console.log('ML SLL: ', this.state.snapLocationsList);
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: 41.8781,
          lng: -87.6298
        }}
        // onClick={this.onMapClicked}
        onReady={this.onMapReady}
        visible={false}>  
        {/* <Listing places={this.state.places} /> */}
        <InfoWindow onClose={this.onInfoWindowClose}>
        <Marker
          position={{ lat: 41.8781, lng: -87.6298 }}
          title ={"SNAP Map"}
        />
        {this.props.snapLocationsList.map(SLL=> {
          return (
            <Marker
              key={SLL.Store_Name}
              label={SLL.name}
              position={{ lat: SLL.latitude, lng: SLL.longitude }}
            />
          );
        })}
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDPpPhiwe2nBilWB_ihli85BlyRID4DnpU"
 })(MapContainer);
