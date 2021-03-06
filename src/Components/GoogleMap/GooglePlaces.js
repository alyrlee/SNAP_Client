import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import Autocomplete from "react-google-autocomplete";
import AuthApiService from "../Services/auth-api-service";
import Geocode from "react-geocode";
import ReactDOMServer from "react-dom/server";

Geocode.setApiKey("AIzaSyDPpPhiwe2nBilWB_ihli85BlyRID4DnpU");
Geocode.enableDebug();

export class MapContainer extends Component {
  state = {
    places: [],
    showingInfoWindow: false,
    activeMarker: {},
    onPlaceSelected: {},
    stores: {},
    address: "",
    city: "",
    area: "",
    state: "",
    content: null,
    markers: [],
    cityStores: {},
    markerPosition: {
      lat: 0,
      lng: 0,
      city: "",
      state: "",
    },
    mapPosition: {
      lat: 0,
      lng: 0,
    },
    mapcenter: {
      lat: 42.3600825,
      lng: -71.0588801,
    },
    coordinates: {
      lat: 42.3600825,
      lng: -71.0588801,
    },
  };

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState(
          {
            mapPosition: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            markerPosition: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          },
          () => {
            Geocode.fromLatLng(
              position.coords.latitude,
              position.coords.longitude
            ).then(
              (response) => {
                const address = response.results[0].formatted_address,
                  addressArray = response.results[0].address_components,
                  city = this.getCity(addressArray),
                  area = this.getArea(addressArray),
                  state = this.getState(addressArray);
                this.setState({
                  address: address ? address : "",
                  area: area ? area : "",
                  city: city ? city : "",
                  state: state ? state : "",
                });
                this.getStoresByCityFromAPI(city, state);
              },
              (error) => {
                console.error(error);
              }
            );
          }
        );
      });
    } else {
      console.error("Geolocation is not supported by this browser!");
    }
  }
  getStoresByCityFromAPI = (city, state) => {
    AuthApiService.postCityState(city, state)
      .then((resJSON) => {
        this.setState({ cityStores: resJSON });
      })
      .catch((error) => {
        if (error.resJSON) console.error({ error: error });
      });
  };
  getCity = (addressArray) => {
    let city = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0] && "locality" === addressArray[i].types[0]) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };
  getArea = (addressArray) => {
    let area = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if (
            "sublocality_level_1" === addressArray[i].types[j] ||
            "locality" === addressArray[i].types[j]
          ) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };
  getState = (addressArray) => {
    let state = "";
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          "administrative_area_level_1" === addressArray[i].types[0]
        ) {
          state = addressArray[i].short_name;
          return state;
        }
      }
    }
  };

  onChange = (event) => {
    event.preventDefault();
    this.props.onChange(this.state.data);
  };

  onInfoWindowOpen = (event) => {};

  onMarkerLoaded = (event) => {
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng();
    Geocode.fromLatLng(newLat, newLng).then(
      (response) => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = this.getCity(addressArray),
          area = this.getArea(addressArray),
          state = this.getState(addressArray);
        this.setState({
          address: address ? address : "",
          area: area ? area : "",
          city: city ? city : "",
          state: state ? state : "",
          markerPosition: {
            lat: newLat,
            lng: newLng,
            city: city,
            state: state,
            address: address,
          },
          mapPosition: {
            lat: newLat,
            lng: newLng,
          },
        });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  onPlaceSelected = (place) => {
    const city = place.address_components[0].long_name;
    const state = place.address_components[2].short_name;
    const address = place.formatted_address;

    this.getStoresByCityFromAPI(city, state);
    const { geometry } = place;
    if (geometry) {
      const { location } = place.geometry;
      if (location) {
        this.setState({
          mapcenter: {
            lat: location.lat(),
            lng: location.lng(),
          },
          markerPosition: {
            city: city,
            state: state,
            address: address,
          },
        });
      }
    }
  };

  onMarkerClick = (clickedMarkerInfo, marker, e) => {
    this.setState({
      onPlaceSelected: clickedMarkerInfo,
      activeMarker: marker,
      showingInfoWindow: true,
      markers: true,
    });
  };

  onInfoWindowClose = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        markers: null,
      });
    }
  };

  markerContent = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        content: ReactDOMServer.renderToString("div"),
        onClick: "div",
      });
    }
  };

  createMarkers = () => {
    const { cityStores } = this.state;
    const isEmpty = Object.entries(cityStores).length === 0;
    if (!isEmpty) {
      const markers = cityStores.city.map((cs) => {
        return (
          <Marker
            key={`${cs.latitude}${cs.longitude}`}
            id={cs.objectid}
            name={cs.store_name}
            store_name={cs.store_name}
            title={cs.store_name}
            position={{
              lat: cs.latitude,
              lng: cs.longitude,
            }}
            address={cs.address}
            onClick={this.onMarkerClick}
            content={this.state.content}
          >
            <InfoWindow
              position={{
                lat: cs.latitude,
                lng: cs.longitude,
              }}
              marker={this.state.activeMarker}
              onClose={this.onInfoWindowClose}
              visible={this.state.showingInfoWindow}
            >
              <div className="selected-cs">
                <h1>{cs.name}</h1>
                <p>{cs.store_name}</p>
                <p>{cs.address}</p>
              </div>
              {/* ` */}
            </InfoWindow>
          </Marker>
        );
      });
      return markers;
    }
  };

  render() {
    return (
      <Map
        google={this.props.google}
        onReady={this.state.place}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          marginTop: "3%",
        }}
        className={"map"}
        zoom={13}
        initialCenter={{
          lat: this.state.mapcenter.lat,
          lng: this.state.mapcenter.lng,
        }}
        center={{
          lat: this.state.mapcenter.lat,
          lng: this.state.mapcenter.lng,
        }}
        content={this.state.content}
      >
        <Autocomplete
          input
          id="autocomplete"
          type="text"
          placeholder="Search"
          fields={[
            "address_components",
            "formatted_address",
            "place_id",
            "geometry",
            "name",
          ]}
          style={{
            width: "100%",
            height: "70px",
            paddingLeft: "16px",
            marginBottom: "100px",
            position: "relative",
          }}
          onPlaceSelected={this.onPlaceSelected}
          types={["(cities)"]}
          // input={value.toString()}
          value={this.state.input}
          componentRestrictions={{ country: "us" }}
          onChange={(e) => this.setState({ input: e.target.value })}
          terms={{
            key: "AIzaSyDPpPhiwe2nBilWB_ihli85BlyRID4DnpU",
            language: "en",
            input: "value",
          }}
        />
        {this.createMarkers()}
        <InfoWindow
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <div
              style={{
                backgroundColor: `yellow`,
                opacity: 0.75,
                padding: `12px`,
                border: `2.5px solid black`,
              }}
            >
              <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                <div content={this.state.content}>
                  <div> SNAP Location Info </div>
                  <h3>{this.state.onPlaceSelected.name}</h3>
                  <h3>{this.state.onPlaceSelected.address}</h3>
                </div>
              </div>
            </div>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDPpPhiwe2nBilWB_ihli85BlyRID4DnpU",
})(MapContainer);
