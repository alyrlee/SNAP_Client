// import React from "react";
// import {
//   GoogleMap,
//   useLoadScript,
//   Marker,
//   InfoWindow,
// } from "@react-google-maps/api";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
// } from "@reach/combobox";
// import { formatRelative } from "date-fns";

// import "@reach/combobox/styles.css";
// import mapStyles from "./mapStyles";

// const libraries = ["places"];
// const mapContainerStyle = {
//   height: "100vh",
//   width: "100vw",
// };
// const options = {
//   styles: mapStyles,
//   disableDefaultUI: true,
//   zoomControl: true,
// };
// const center = {
//   lat: 42.3601,
//   lng: -71.0589,
// };

// export default function MapContainer() {
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: 'AIzaSyDPpPhiwe2nBilWB_ihli85BlyRID4DnpU',
//     libraries,
//   });
//   const [markers, setMarkers] = React.useState([]);
//   const [selected, setSelected] = React.useState(null);

//   const onMapClick = React.useCallback((e) => {
//     setMarkers((current) => [
//       ...current,
//       {
//         lat: e.latLng.lat(),
//         lng: e.latLng.lng(),
//         time: new Date(),
//       },
//     ]);
//   }, []);

//   const mapRef = React.useRef();
//   const onMapLoad = React.useCallback((map) => {
//     mapRef.current = map;
//   }, []);

//   const panTo = React.useCallback(({ lat, lng }) => {
//     mapRef.current.panTo({ lat, lng });
//     mapRef.current.setZoom(14);
//   }, []);

//   if (loadError) return "Error";
//   if (!isLoaded) return "Loading...";

//   return (
//     <div>
//       {/* <h1>
//         Bears{" "}
//         <span role="img" aria-label="tent">
//           ⛺️
//         </span>
//       </h1> */}

//       <Locate panTo={panTo} />
//       <Search panTo={panTo} />

//       <GoogleMap
//         id="map"
//         mapContainerStyle={mapContainerStyle}
//         zoom={8}
//         center={center}
//         options={options}
//         onClick={onMapClick}
//         onLoad={onMapLoad}
//       >
//         {markers.map((marker) => (
//           <Marker
//             key={`${marker.lat}-${marker.lng}`}
//             position={{ lat: marker.lat, lng: marker.lng }}
//             onClick={() => {
//               setSelected(marker);
//             }}
//             icon={{
//               url: `/bear.svg`,
//               origin: new window.google.maps.Point(0, 0),
//               anchor: new window.google.maps.Point(15, 15),
//               scaledSize: new window.google.maps.Size(30, 30),
//             }}
//           />
//         ))}

//         {selected ? (
//           <InfoWindow
//             position={{ lat: selected.lat, lng: selected.lng }}
//             onCloseClick={() => {
//               setSelected(null);
//             }}
//           >
//             <div>
//               <h2>
//                 <span role="img" aria-label="bear">
//                   🐻
//                 </span>{" "}
//                 Alert
//               </h2>
//               <p>Spotted {formatRelative(selected.time, new Date())}</p>
//             </div>
//           </InfoWindow>
//         ) : null}
//       </GoogleMap>
//     </div>
//   );
// }

// function Locate({ panTo }) {
//   return (
//     <button
//       className="locate"
//       onClick={() => {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             panTo({
//               lat: position.coords.latitude,
//               lng: position.coords.longitude,
//             });
//           },
//           () => null
//         );
//       }}
//     >
//       <img src="/compass.svg" alt="compass" />
//     </button>
//   );
// }

// function Search({ panTo }) {
//   const {
//     ready,
//     value,
//     suggestions: { status, data },
//     setValue,
//     clearSuggestions,
//   } = usePlacesAutocomplete({
//     requestOptions: {
//       location: { lat: () => 42.3601, lng: () => -71.0589 },
//       radius: 100 * 1000,
//     },
//   });

//   // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

//   const handleInput = (e) => {
//     setValue(e.target.value);
//   };

//   const handleSelect = async (address) => {
//     setValue(address, false);
//     clearSuggestions();

//     try {
//       const results = await getGeocode({ address });
//       const { lat, lng } = await getLatLng(results[0]);
//       panTo({ lat, lng });
//     } catch (error) {
//       console.log("😱 Error: ", error);
//     }
//   };

//   return (
//     <div className="search">
//       <Combobox onSelect={handleSelect}>
//         <ComboboxInput
//           //key value
//           value={value}
//           onChange={handleInput}
//           disabled={!ready}
//           placeholder="Search your location"
//         />
//         <ComboboxPopover>
//           <ComboboxList>
//             {status === "OK" &&
//               data.map(({ id, description }) => (
//                 <ComboboxOption key={id} value={description} />
//               ))}
//           </ComboboxList>
//         </ComboboxPopover>
//       </Combobox>
//     </div>
//   );
// }

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

//get all locations from db


//get list of snap locations for Boston 
  setSnapLocationsList() {
    const data =[
      {
        // x   |     y      | objectid |                     store_name                     |                address                | address_line__2 |  city  | state | zip5 | zip4 | county  |  longitude  |  l
        // -71.0622020 | 42.3649290 |     4030 | 7-eleven 32476C                                    | 91 Causeway St                        | 91-99           | Boston | MA    | 2114 | 1308 | SUFFOLK | -71.0622020 | 42.3649290 | 2020-12-15 02:22:00-05
        X: -71.0622020,
        Y: 42.36492920,
        objectid: 4030,
        store_name: '7-eleven 32476C',
        address: '91 Causeway St',
        city: 'Boston',
        state: 'MA'  
      },
      {
        // x   |     y      | objectid |                     store_name                     |                address                | address_line__2 |  city  | state | zip5 | zip4 | county  |  longitude  |  l
        // -71.0622020 | 42.3649290 |     4030 | 7-eleven 32476C                                    | 91 Causeway St                        | 91-99           | Boston | MA    | 2114 | 1308 | SUFFOLK | -71.0622020 | 42.3649290 | 2020-12-15 02:22:00-05
        X: -71.0622021,
        Y: 42.36492922,
        objectid: 4031,
        store_name: '8-eleven 32476C',
        address: '93 Causeway St',
        city: 'Boston',
        state: 'MA'  
      }
    ]

    this.setState({     
      setSnapLocationsList: {data}
     })
     console.log('get data', data);
  }

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
          position={{lat: 32.396797, lng: -82.055046}} />
        <Marker
          name={'Meijer Gas Station'}
          position={{lat: 42.3325693, lng: -83.405739}} />
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
          //  ref={input => this.search = input}
          //  input id="searchTextField"
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
            marker={this.state.activeMarker}
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