// import React, { Component } from 'react';
// import PropTypes from 'prop-types'

// var googlemaps;

// export default class SearchBox extends Component {
//   static propTypes = {
//     placeholder: PropTypes.string,
//     onPlacesChanged: PropTypes.func
//   }
//   render() {
//     return <input ref="input" placeholder={this.props.placeholder} type="text"/>;
//   }
//   onPlacesChanged = () => {
//     if (this.props.onPlacesChanged) {
//       this.props.onPlacesChanged(this.searchBox.getPlaces());
//     }
//   }
//   componentDidMount() {
//     var input = this.refs.input;
//     this.searchBox = new googlemaps.places.SearchBox(input);
//     this.searchBox.addListener('places_changed', this.onPlacesChanged);
//   }
//   componentWillUnmount() {
//     this.searchBox.removeListener('places_changed', this.onPlacesChanged);
//   }
// }
import React, { Component } from 'react';
import './SearchBox.css';
var google;
export class locationInput extends Component {
    render() {
        const { values, handleChange } = this.props;

        function initAutocomplete() {
            var input = document.getElementById('pac-input');
            var searchBox = new google.maps.places.SearchBox(input);

            var markers = [];
            searchBox.addListener('places_changed', function() {
              var places = searchBox.getPlaces();

              if (places.length === 0) {
                return;
              }

              markers.forEach(function(marker) {
                marker.setMap(null);
              });
              markers = [];

              var bounds = new google.maps.LatLngBounds();
              places.forEach(function(place) {
                if (!place.geometry) {
                  console.log("Returned place contains no geometry");
                  return;
                }
                var icon = {
                  url: place.icon,
                  size: new google.maps.Size(71, 71),
                  origin: new google.maps.Point(0, 0),
                  anchor: new google.maps.Point(17, 34),
                  scaledSize: new google.maps.Size(25, 25)
                };

                markers.push(new google.maps.Marker({
                  icon: icon,
                  title: place.name,
                  position: place.geometry.location
                }));

                if (place.geometry.viewport) {
                  bounds.union(place.geometry.viewport);
                } else {
                  bounds.extend(place.geometry.location);
                }
              });

            });
          }
          initAutocomplete()
        return (

                <input
                    defaultValue={values.StoreName}
                    onChange={handleChange('StorName')}
                    id="pac-input"
                    className="controls"
                    type="text"
                    placeholder="Search Box"
                />

        );
    }
}

export default locationInput;