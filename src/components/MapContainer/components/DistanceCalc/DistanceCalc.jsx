import React from 'react';
import { Marker } from 'google-maps-react';

import isEmpty from 'utils/isEmpty';
import Polyline from './components/Polyline';
import { rulerModeClickStrream } from 'services/map';

class DistanceCalc extends React.Component {
  state = {
    root: {},
    target: {},
    path: [],
    distance: 0
  };

  componentDidMount () {
    rulerModeClickStrream.onValue(this.onMapClick);
  }

  render () {
    return (
      <div>
        {!isEmpty(this.state.root) &&
          <Marker
            position={this.state.root}
            {...this.props}
          />}
        {!isEmpty(this.state.target) &&
          <Marker
            {...this.props}
            position={this.state.target}
          />}
        {this.state.path.length &&
          <div>
            <Marker
              {...this.props}
              position={this.getMidpoint(this.state.path)}
              label={{
                fontSize: '16px',
                fontWeight: '700',
                text: this.state.distance + ' km'
              }}
              icon=" "
            />
            <Polyline
              {...this.props}
              path={this.state.path}
              geodesic={false}
              strokeColor="#0000FF"
              strokeOpacity={0.4}
              strokeWeight={2}
            />
          </div>
        }
      </div>
    );
  }

  onMapClick = ({ event }) => {
    if (!isEmpty(this.state.root) && !isEmpty(this.state.target)) {
      this.setState({
        root: {},
        target: {},
        path: []
      });
    }
    this.getLocation(event.latLng).then(location => {
      const state = { ...this.state };
      if (isEmpty(state.root) && isEmpty(state.target)) {
        state.root = location;
      } else if (isEmpty(state.target)) {
        state.target = location;
      }
      if (!isEmpty(state.root) && !isEmpty(state.target)) {
        const distance = this.calcDistance(state.root, state.target);
        const path = [
          state.root,
          state.target
        ];
        state.distance = distance;
        state.path = path;
      }
      this.setState(state);
    });
  }

  getLocation (latLng) {
    const wrappedGeocodePromise = (config) => {
      return new Promise((resolve, reject) => {
        const geocode = this.props.google.maps.Geocoder.prototype.geocode;
        geocode(config, (results, status) => {
          if (status !== 'OK') {
            reject();
            return;
          }
          resolve(results);
        });
      });
    };
    return wrappedGeocodePromise({
      location: {
        lat: latLng.lat(),
        lng: latLng.lng()
      }
    }).then(results => {
      const country = results.find(result => {
        return result.types.find(type => type === 'country');
      });
      if (!country) {
        throw new Error('Cant find country');
      }
      const isoCode = country.address_components[0].short_name;
      return fetch('https://restcountries.eu/rest/v2/alpha/' + isoCode);
    }).then(response => (
      response.json()
    )).then(data => {
      return wrappedGeocodePromise({
        address: data.capital
      });
    }).then(([capital]) => {
      return {
        lat: capital.geometry.location.lat(),
        lng: capital.geometry.location.lng()
      };
    });
  }

  getMidpoint (path) {
    if (!path.length) {
      return;
    }
    return path.reduce((prevPoint, currPoint) => {
      return {
        lat: (prevPoint.lat + currPoint.lat) / 2,
        lng: (prevPoint.lng + currPoint.lng) / 2
      };
    });
  }

  calcDistance (point1, point2) {
    const { google } = this.props;
    if (typeof point1.lat === 'number' && typeof point1.lng === 'number') {
      point1 = new google.maps.LatLng(point1.lat, point1.lng);
    }
    if (typeof point2.lat === 'number' && typeof point2.lng === 'number') {
      point2 = new google.maps.LatLng(point2.lat, point2.lng);
    }
    return Math.round(google.maps.geometry.spherical.computeDistanceBetween(point1, point2) / 10) / 100;
  }
}

export default DistanceCalc;