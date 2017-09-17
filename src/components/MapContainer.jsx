import React from 'react';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import autobind from 'autobind-decorator';
import * as _ from 'underscore';
import 'whatwg-fetch';

class MapContainer extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            distance: 0,
            target: {},
            root: {}
        };
    }

    render () {
        return (
            <div>
                <Map
                    google={this.props.google}
                    onClick={this.onClick}
                    zoom={3}
                    maxZoom={3}
                    minZoom={3}
                    ref={node => {
                        this.map = node;
                    }}
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
                </Map>
            </div>
        );
    }

    getLocation (latLng) {
        const geocoder = this.props.google.maps.Geocoder;
        geocoder.prototype.geocode({
            location: {
                lat: latLng.lat(),
                lng: latLng.lng()
            }
        }, (results, status) => {
            if (status === 'OK') {
                const country = _.find(results, result => {
                    return _.find(result.types, type => type === 'country');
                });
                if (country) {
                    const isoCode = country.address_components[0].short_name;
                    const getLatLng = (place) => {
                        const lat = place.geometry.location.lat();
                        const lng = place.geometry.location.lng();
                        return {
                            lat,
                            lng
                        };
                    };
                    fetch('https://restcountries.eu/rest/v2/alpha/' + isoCode)
                    .then(response => response.json())
                    .then(data => {
                        geocoder.prototype.geocode({
                            address: data.capital
                        }, ([result], status) => {
                            if (status === 'OK') {
                                const position = getLatLng(result);
                                if (_.isEmpty(this.state.root) && _.isEmpty(this.state.target)) {
                                    this.setState({ root: position });
                                } else if (_.isEmpty(this.target)) {
                                    this.setState({ target: position });
                                }
                                if (!_.isEmpty(this.state.root) && !_.isEmpty(this.state.target)) {
                                    const maps = this.props.google.maps;
                                    const rootLatLng = new maps.LatLng(this.state.root.lat, this.state.root.lng);
                                    const targetLatLng = new maps.LatLng(this.state.target.lat, this.state.target.lng);
                                    const distance = this.calcDistance(rootLatLng, targetLatLng);
                                    this.setState({ distance });
                                    const coordinates = [
                                        this.state.root,
                                        this.state.target
                                    ];
                                    this.line = new maps.Polyline({
                                        path: coordinates,
                                        geodesic: true,
                                        strokeColor: '#000000',
                                        strokeOpacity: 0.7,
                                        strokeWeight: 3
                                    });
                                    this.line.setMap(this.map.map);
                                }
                            }
                        });
                    });
                }
            }
        });
    }

    @autobind
    onClick (props, map, event) {
        event.stop();
        if (!_.isEmpty(this.state.root) && !_.isEmpty(this.state.target)) {
            this.setState({ root: {} });
            this.setState({ target: {} });
            this.line.setMap(null);
        }
        this.getLocation(event.latLng);
    }

    calcDistance (point1, point2) {
        const { google } = this.props;
        return (google.maps.geometry.spherical.computeDistanceBetween(point1, point2) / 1000).toFixed(2);
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBYB1G3Kc7XlOvlWN_v5SC7mYJcCSZgKtY',
    libraries: ['geometry', 'places']
})(MapContainer);