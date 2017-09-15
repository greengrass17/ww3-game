import React from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import autobind from 'autobind-decorator';
import { set } from 'services/utils';

class MapContainer extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            root: {
                lat: 0,
                lng: 0
            },
            target: {
                lat: 0,
                lng: 0
            }
        };
    }

    render () {
        return (
            <form onSubmit={this.calcDistance}>
                <div>
                    <input type="number" id="root.lat" value={this.state.root.lat} onChange={this.handleInputChange} />
                    <input type="number" id="root.lng" value={this.state.root.lng} onChange={this.handleInputChange} />
                </div>
                <div>
                    <input type="number" id="target.lat" value={this.state.target.lat} onChange={this.handleInputChange} />
                    <input type="number" id="target.lng" value={this.state.target.lng} onChange={this.handleInputChange} />
                </div>
                <label>{this.state.distance}</label>
                <button>Get distance</button>
            </form>
        );
    }

    @autobind
    handleInputChange (event) {
        const state = this.state;
        set(state, event.target.id, event.target.value);
        this.setState(state);
    }

    @autobind
    calcDistance (event) {
        event.preventDefault();
        const gMap = this.props.google.maps;
        const root = new gMap.LatLng(+this.state.root.lat, +this.state.root.lng);
        const target = new gMap.LatLng(+this.state.target.lat, +this.state.target.lng);
        const distance = (gMap.geometry.spherical.computeDistanceBetween(root, target) / 1000).toFixed(2);
        this.setState({ distance });
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBYB1G3Kc7XlOvlWN_v5SC7mYJcCSZgKtY',
    libraries: ['geometry']
})(MapContainer);