import React from "react";
import AuthApiService from "../Services/auth-api-service";
import { GoogleMap,useLoadScript,Marker,InfoWindow,} from "@react-google-maps/api";
import usePlacesAutocomplete, {getGeocode, getLatLng,} from "use-places-autocomplete";
import {Combobox, ComboboxInput, ComboboxPopover,ComboboxList,ComboboxOption,} from "@reach/combobox";

import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";
import {render} from "@testing-library/react";

const libraries = ["places"];
const mapContainerStyle = {height: "100vh",width: "100vw",};
const options = {styles: mapStyles,disableDefaultUI: true,zoomControl: true,};
const center = { lat: 42.3600825,lng: -71.0588801};

export default function MapContainer() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.API_TOKEN,
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  const onMapClick = React.useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      },
    ]);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  getStoresByCityFromAPI = (city, state) => {
    AuthApiService.postCityState(city, state)
      .then((resJSON) => {
        this.setState({ cityStores: resJSON });
      })
      .catch((error) => {
        if (error.resJSON) console.error({ error: error });
      });
  };
}

return (
  <div>
    <Locate panTo={panTo} />
      <Search panTo={panTo} />
  <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
            icon={{
              url: `/stores.svg`,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            </InfoWindow>
) : null}
</GoogleMap>
</div>
);

function Locate({ panTo }) {
return (
<button
className="locate"
onClick={() => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      panTo({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    },
    () => null
  );
}}
>
<img src="/compass.svg" alt="compass" />
</button>
);
}

function Search({ panTo }) {
const {
ready,
value,
suggestions: { status, data },
setValue,
clearSuggestions,
} = usePlacesAutocomplete({
requestOptions: {
location: { lat: () => 43.6532, lng: () => -79.3832 },
radius: 100 * 1000,
},
});

const handleInput = (e) => {
setValue(e.target.value);
};

const handleSelect = async (address) => {
setValue(address, false);
clearSuggestions();

try {
const results = await getGeocode({ address });
const { lat, lng } = await getLatLng(results[0]);
panTo({ lat, lng });
} catch (error) {
console.log("😱 Error: ", error);
}
};

return (
<div className="search">
<Combobox onSelect={handleSelect}>
  <ComboboxInput
    value={value}
    onChange={handleInput}
    disabled={!ready}
    placeholder="Search your location"
  />
  <ComboboxPopover>
    <ComboboxList>
      {status === "OK" &&
        data.map(({ id, description }) => (
          <ComboboxOption key={id} value={description} />
        ))}
    </ComboboxList>
  </ComboboxPopover>
</Combobox>
</div>
);
}


 