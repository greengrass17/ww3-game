import React from 'react';
import { GoogleApiWrapper, Map } from 'google-maps-react';

import DistanceCalc from './components/DistanceCalc';
import HighlightLayer from './components/HighlightLayer';
import { addClick, changeMode } from 'services/map';

class MapContainer extends React.Component {
  state = {
    isRulerEnabled: false,
  }

  render () {
    const center = this.props.google ? new this.props.google.maps.LatLng(30, 0) : null;
    return (
      <div>
        <Map
          google={this.props.google}
          onClick={this.onClick}
          center={center}
          zoom={2}
        >
          <DistanceCalc
            google={this.props.google}
          />
          <HighlightLayer
            google={this.props.google}
          />
        </Map>
      </div>
    );
  }

  onClick = (props, map, event) => {
    event.stop();
    addClick(props, map, event);
  };

  toggleRuler = (event, isRulerEnabled) => {
    this.setState({ isRulerEnabled });
    changeMode(isRulerEnabled ? 'ruler' : 'select');
  };
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBYB1G3Kc7XlOvlWN_v5SC7mYJcCSZgKtY',
  libraries: ['geometry', 'places']
})(MapContainer);