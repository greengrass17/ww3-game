import React from 'react';

import { wrappedPromise } from 'services/utils';

class Polyline extends React.Component {
    render () {
        return null;
    }

    componentDidMount () {
        this.polylinePromise = wrappedPromise();
        this.renderPolyline();
    }

    componentDidUpdate (prevProps) {
        if (this.props.map !== prevProps.map) {
            if (this.polyline) {
                this.polyline.setMap(null);
                this.renderPolyline();
            }
        }
    }

    componentWillUnmount () {
        if (this.polyline) {
            this.polyline.setMap(null);
        }
    }

    renderPolyline () {
        const {
            map,
            google,
            path,
            geodesic,
            strokeColor,
            strokeOpacity,
            strokeWeight
        } = this.props;

        if (!google) {
            return null;
        }

        const params = {
            map,
            path,
            geodesic,
            strokeColor,
            strokeOpacity,
            strokeWeight
        };

        this.polyline = new google.maps.Polyline(params);

        this.polylinePromise.resolve(this.polyline);
    }

    getPolyline () {
        return this.polylinePromise;
    }
}

export default Polyline;