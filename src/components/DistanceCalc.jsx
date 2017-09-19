import React from 'react';
import * as _ from 'underscore';
import { Marker } from 'google-maps-react';
import autobind from 'autobind-decorator';

import Polyline from './Polyline.jsx';

class DistanceCalc extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            root: {},
            target: {},
            path: [],
            distance: 0
        };
    }

    render () {
        return (
            <div>
                {!_.isEmpty(this.state.root) &&
                    <Marker
                        position={this.state.root}
                        {...this.props}
                    />}
                {!_.isEmpty(this.state.target) &&
                    <Marker
                        {...this.props}
                        position={this.state.target}
                    />}
                {this.state.path.length &&
                    <div>
                        <Marker
                            {...this.props}
                            position={this.getMidpoint(this.state.path)}
                            ref={node => {
                                this.midPointMarker = node;
                            }}
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

    @autobind
    onMapClick (props, map, event) {
        if (!_.isEmpty(this.state.root) && !_.isEmpty(this.state.target)) {
            this.setState({
                root: {},
                target: {},
                path: []
            });
        }
        this.getLocation(event.latLng).then(location => {
            if (_.isEmpty(this.state.root) && _.isEmpty(this.state.target)) {
                this.setState({ root: location });
            } else if (_.isEmpty(this.target)) {
                this.setState({ target: location });
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
        return wrappedGeocodePromise({
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
        if (_.isNumber(point1.lat) && _.isNumber(point1.lng)) {
            point1 = new google.maps.LatLng(point1.lat, point1.lng);
        }
        if (_.isNumber(point2.lat) && _.isNumber(point2.lng)) {
            point2 = new google.maps.LatLng(point2.lat, point2.lng);
        }
        return (google.maps.geometry.spherical.computeDistanceBetween(point1, point2) / 1000).toFixed(2);
    }
}

export default DistanceCalc;