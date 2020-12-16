import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
import snapLocationsList from '../SnapLocationStores/SnapLocationsList';
const URL = 'http://localhost:8000/api/stores';
Geocode.setApiKey("AIzaSyDPpPhiwe2nBilWB_ihli85BlyRID4DnpU");
Geocode.enableDebug();


const mapStyles = {
  // width: "100%",
  height: "100%",
  // position: 'relative',
};
// const Listing = ({ stores, store_name }) => (
//   <ul>{stores && stores.map(stores => <li key={Store_Name.objectid}>{Store_Name.objectid}</li>)}</ul>
// );


export class MapContainer extends Component {
  state = {
    places: [],
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    stores: {},
    address: '',
    city: '',
    area: '',
    state: '',
    markerPosition: {
      lat: 0,
      lng: 0
    },
    mapPosition: {
        lat: 0,
        lng: 0
    },     
    coordinates: {
        lat: 42.3600825,
        lng: -71.0588801
    }  
  };

  // //allow load place and configure search to load snap locations
  // onPlaceSelected = ( place ) => {
  //   console.log('plc', place);

  //   if (place) {
  //     const lat = place.geometry.location.lat();
  //     const lng = place.geometry.location.lng();
      // debugger;
  //     this.setState({coordinates: {lat, lng}});
  //   }

  // this.setState({coordinates: {lat: lat, lng: lng}});
  // this.setState({coordinates: {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()}});

  componentDidMount() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({
                mapPosition: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                },
                markerPosition: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                }
            },
                () => {
                    Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
                        response => {
                            console.log(response)
                            debugger;
                            const address = response.results[0].formatted_address,
                                addressArray = response.results[0].address_components,
                                city = this.getCity(addressArray),
                                area = this.getArea(addressArray),
                                state = this.getState(addressArray);
                            console.log('city', city, area, state);
                            this.setState({
                                address: (address) ? address : '',
                                area: (area) ? area : '',
                                city: (city) ? city : '',
                                state: (state) ? state : '',
                            })
                        },
                        error => {
                            console.error(error);
                        }
                    );

                })
        });
    } else {
        console.error("Geolocation is not supported by this browser!");
    }
  };

  getCity = (addressArray) => {
    let city = '';
    for (let i = 0; i < addressArray.length; i++) {
        if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
            city = addressArray[i].long_name;
            return city;
        }
    }
  };

  getArea = (addressArray) => {
      let area = '';
      for (let i = 0; i < addressArray.length; i++) {
          if (addressArray[i].types[0]) {
              for (let j = 0; j < addressArray[i].types.length; j++) {
                  if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
                      area = addressArray[i].long_name;
                      return area;
                  }
              }
          }
      }
  };

  getState = (addressArray) => {
    let state = '';
    for (let i = 0; i < addressArray.length; i++) {
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
                state = addressArray[i].long_name;
                return state;
            }
        }
    }
  };

  onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat(),
        newLng = event.latLng.lng();

    Geocode.fromLatLng(newLat, newLng).then(
        response => {
            const address = response.results[0].formatted_address,
                addressArray = response.results[0].address_components,
                city = this.getCity(addressArray),
                area = this.getArea(addressArray),
                state = this.getState(addressArray);
            this.setState({
                address: (address) ? address : '',
                area: (area) ? area : '',
                city: (city) ? city : '',
                state: (state) ? state : '',
                markerPosition: {
                    lat: newLat,
                    lng: newLng
                },
                mapPosition: {
                    lat: newLat,
                    lng: newLng
                },
            })
        },
        error => {
            console.error(error);
        }
    );
  };



  onPlaceSelected = ( place ) => {
    console.log('plc', place);

    // if search returns an unknown city, the search term will be inside of place.name
    // if search results a real city, place.geometry will contain place.geometry.location
    const {geometry} = place;
    if (geometry) {
      const {location} = place.geometry;
      if (location) {
        this.setState({
          coordinates: {
            // lat: place.geometry.location.lat(), 
            // lng: place.geometry.location.lng()
            lat: location.lat(), 
            lng: location.lng()
          }
        });
      }
    }
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  onSearchClicked = () => { 
    fetch(URL)
    // .then(function(response) {
    //   // parse the response into suitable format
    //   // response.text()
    //   response.json();
    // })
    .then(response => response.json())
    .then(stores => {
        const snapLocationsList = Object.keys(stores)
              .map(key => stores[key].item[0]);
        this.setState({
          snapLocationsList: snapLocationsList
        });     
      console.log('stores',stores({}));
      console.log('URL', URL);
    })
    .catch(err => {
              console.log('Handling the error here.', err);
    });
  };
 

onMapReady = (map) => this.textSearch(map, map.center);


textSearch = (map, center) => {
  const { google } = this.props;
  
  var service = new google.maps.places.PlacesService(map);

  //Specify location, radius and place types for your Places API search.
  const request = {
    location: center,
    radius: '500',
    query: '',
    type: ['cities']
  };

  service.textSearch(request, (results, status) => {
    if (status === google.maps.places.TextSearchRequest.OK)
      this.setState({ places: results });
  });
};
     
//add data from state onto map with address, city , etc....
  render() {
    // if (!this.props.loaded) return <div>Loading...</div>;
    console.log(this.props.snapLocationsList);
    console.log('ML SLL: ', this.state.snapLocationsList);
    return (
      <Map
      //change the key to force lat,lng to re-render a new key 
           key={this.state.coordinates.lat+this.state.coordinates.lng} 
           google={this.props.google}
           zoom={14}
           style={mapStyles}
           initialCenter={
            {
              lat: this.state.coordinates.lat,
              lng: this.state.coordinates.lng
            }
          }
            onClick={this.onMapClicked}
            onReady={this.onMapReady} 
            stores ={this.state.stores} 
            // visible={false}
      >
      <Autocomplete
           placeholder='Search'
           style={{
              width: '100%',
              height: '40px',
              paddingLeft: '16px',
              marginTop: '2px',
              marginBottom: '100px'
            }}
           onPlaceSelected={ this.onPlaceSelected }
           types={['(cities)']}
           componentRestrictions={{country: 'us'}}
           query={{
              key: 'AIzaSyDPpPhiwe2nBilWB_ihli85BlyRID4DnpU',
              language: 'en',
          }}
      />    
        <Marker 
            onClick={this.onMarkerClick}
            name={'Current location'} 
            draggable={true}
            // snapLocationsList={this.snapLocationsList}
            // onDragEnd={this.onMarkerDragEnd}
            // position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
        />

        {/* <Listing stores={this.state.stores} /> */}
        <InfoWindow
            onOpen={this.windowHasOpened}
            onClose={this.windowHasClosed}
            visible={this.state.showingInfoWindow}>
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
        </InfoWindow>
      </Map>
    )
  }
}



export default GoogleApiWrapper({
  apiKey: "AIzaSyDPpPhiwe2nBilWB_ihli85BlyRID4DnpU"
 })(MapContainer);