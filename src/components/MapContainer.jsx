import React from 'react';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import autobind from 'autobind-decorator';
import * as _ from 'underscore';
import 'whatwg-fetch';

import Polyline from './Polyline.jsx';

class MapContainer extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            distance: 0,
            path: [],
            target: {},
            root: {}
        };
    }

    render () {
        const center = this.props.google ? new this.props.google.maps.LatLng(30, 0) : null;
        return (
            <div>
                <div>
                    Distance: {this.state.distance} km
                </div>
                <Map
                    google={this.props.google}
                    onClick={this.onClick}
                    center={center}
                    zoom={2}
                    maxZoom={2}
                    minZoom={2}
                >
                    {!_.isEmpty(this.state.root) &&
                    this.props.google &&
                    <Marker
                        position={this.state.root}
                    />}
                    {!_.isEmpty(this.state.target) &&
                    this.props.google &&
                    <Marker
                        position={this.state.target}
                    />}
                    {this.state.path.length &&
                    <Polyline
                        path={this.state.path}
                        geodesic={true}
                        strokeColor="#000000"
                        strokeOpacity={0.7}
                        strokeWeight={3}
                    />}
                </Map>
            </div>
        );
    }

    getLocation (latLng) {
        const wrappedGeocodePromise = config => {
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
        wrappedGeocodePromise({
            location: {
                lat: latLng.lat(),
                lng: latLng.lng()
            }
        }).then(results => {
            const country = _.find(results, result => {
                return _.find(result.types, type => type === 'country');
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
            const position = {
                lat: capital.geometry.location.lat(),
                lng: capital.geometry.location.lng()
            };
            if (_.isEmpty(this.state.root) && _.isEmpty(this.state.target)) {
                this.setState({ root: position });
            } else if (_.isEmpty(this.target)) {
                this.setState({ target: position });
            }
            if (!_.isEmpty(this.state.root) && !_.isEmpty(this.state.target)) {
                const distance = this.calcDistance(this.state.root, this.state.target);
                const path = [
                    this.state.root,
                    this.state.target
                ];
                this.setState({
                    distance,
                    path
                });
            }
        });
    }

    @autobind
    onClick (props, map, event) {
        event.stop();
        if (!_.isEmpty(this.state.root) && !_.isEmpty(this.state.target)) {
            this.setState({
                root: {},
                target: {},
                path: []
            });
        }
        this.getLocation(event.latLng);
    }

    calcDistance (point1, point2) {
        const { google } = this.props;
        if (_.isNumber(point1.lat) && _.isNumber(point1.lng)) {
            point1 = new google.maps.LatLng(point1.lat, point1.lng);
        }
        if (_.isNumber(point2.lat) && _.isNumber(point2.lng)) {
            point2 = new google.maps.LatLng(point2.lat, point2.lng);
        }
        return (google.maps.geometry.spherical.computeDistanceBetween(point1, point2) / 1000).toFixed(2);
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBYB1G3Kc7XlOvlWN_v5SC7mYJcCSZgKtY',
    libraries: ['geometry', 'places']
})(MapContainer);