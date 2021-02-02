import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import Autocomplete from 'react-google-autocomplete';
import Geocode from 'react-geocode';
Geocode.setApiKey("AIzaSyDPpPhiwe2nBilWB_ihli85BlyRID4DnpU");
Geocode.enableDebug();

const mapStyles = {
  width: "100%",
  height: "100%",
};

export class MapContainer extends Component {
  state = {
    term: '',
    snapLocationsList: {},
    places: [],
    showingInfoWindow: true,
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

onChange = (event) => { event.preventDefault();
  this.props.onChange(this.state.term);
};


onInfoWindowClose = (event) => { };

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
  
//allow load place and configure search to load snap locations\//snapLocationsList is an object that contains an array of store information to display to the user as markers on the google map.
//pass snapLocationsList as a prop
//make request to API to get store location data, pass via component 

snapLocationsList = (stores) => (
  <ul>{stores && stores.map(Store_Name => <li key={Store_Name.objectid}>{Store_Name.objectid}</li>)}</ul>
);
//(data) => {
   //this.setState({ snapLocationsList: data });
})
  onPlaceSelected = ( place ) => {
    console.log('plc', place);
        // const address = place.formatted_address,
        //     addressArray = place.address_components,
        //     city = this.getCity(addressArray),
        //     area = this.getArea(addressArray),
        //     state = this.getState(addressArray),
        //     latValue = place.geometry.location.lat(),
        //     lngValue = place.geometry.location.lng();

        // console.log('latvalue', latValue)
        // console.log('lngValue', lngValue)
    // if search returns an unknown city, the search term will be inside of place.name
    // if search results a real city, place.geometry will contain place.geometry.location
    const {geometry} = place;
    if (geometry) {
      const {location} = place.geometry;
      if (location) {
        this.setState({
          coordinates: {
            lat: location.lat(), 
            lng: location.lng()
          }
        });
      }
    }
  }
// ---
// {stores.map((snapLocationsList) => (
//   <Marker
//     key={place.id}
//     text={place.name}
//     lat={place.geometry.location.lat}
//     lng={place.geometry.location.lng}
  // />  
  // markers.push(
  //   new google.maps.Marker({
  //     map,
  //     icon,
  //     title: place.name,
  //     position: place.geometry.location,
  //   })
  // );

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      // snapLocationsList: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: true,
        activeMarker: false
      })
    }
  };
    
//add data from state onto map with address, city , etc....
  render() {
    // if (!this.props.loaded) return <div>Loading...</div>;
    console.log(this.props.snapLocationsList);
    console.log('ML SLL:', this.state.snapLocationsList);
    return (
      <Map
      //change the key to force lat,lng to re-render a new key 
           key={this.state.coordinates.lat+this.state.coordinates.lng} 
           google={this.props.google}
           zoom={4}
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
      <Marker
            title={'The marker`s title will appear as a tooltip.'}
            name={'Dollar tree'}
            position={{lat: 32.396797, lng: -82.055046}} 
            />
      <Marker
            name={'Meijer Gas Station'}
            position={{lat: 42.3325693, lng: -83.405739}} 
        />
        <Marker />
      <Marker
            name={'Mercados'}
            position={{lat: 39.526478, lng: -122.19395}}
            icon={{
              url: "/path/to/custom_icon.png",
              // anchor: new google.maps.Point(32,32),
              // scaledSize: new google.maps.Size(64,64)
          }} />
      <Marker 
            onClick={this.onMarkerClick}
            name={'Current location'}
            draggable={true}
            onDragEnd={this.onMarkerDragEnd}
            // position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
        />  
      <Autocomplete
           placeholder='Search'
           fields= {['']}
           ref={input => this.search = input}
           input id="searchTextField"
           style={{
              width: '100%',
              height: '25px',
              paddingLeft: '16px',
              // marginTop: '2px',
              marginBottom: '100px'
            }}
           onPlaceSelected={ this.onPlaceSelected }
           types={['(cities)']}
           componentRestrictions={{country: 'us'}}
           onChange={e => this.setState({ term: e.target.value })}
           onClick={(stores, places, snapLocationsList, details = null) => {

            // 'details' is provided when fetchDetails = true
            console.log('stores and details!!', stores, places, snapLocationsList, details);
          }}
           term={{
              key: 'AIzaSyDPpPhiwe2nBilWB_ihli85BlyRID4DnpU',
              language: 'en'
              // search: 'value'
          }}
      />    
        <InfoWindow
            onOpen={this.windowHasOpened}
            onClose={this.windowHasClosed}
            visible={this.state.showingInfoWindow}>
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDPpPhiwe2nBilWB_ihli85BlyRID4DnpU"
  // `${process.env.API_KEY}`
})(MapContainer);