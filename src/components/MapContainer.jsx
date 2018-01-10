import React from 'react';
import { GoogleApiWrapper, Map } from 'google-maps-react';
import Checkbox from 'material-ui/Checkbox';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Popover from 'material-ui/Popover';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import 'whatwg-fetch';

import DistanceCalc from './DistanceCalc.jsx';
import HighlightLayer from './HighlightLayer.jsx';
import CardDeck from './CardDeck.jsx';

const style = {
  marginTop: 12,
  marginBottom: 12
};

class MapContainer extends React.Component {
  isDistanceCalcEnabled = false;
  teamSelected = 0;

  render () {
    const center = this.props.google ? new this.props.google.maps.LatLng(30, 0) : null;
    return (
      <div>
        <Popover
          open={this.props.isMenuOpened}
          useLayerForClickAway={false}
          style={{
            height: '100%',
            width: 220,
            borderRadius: 0
          }}
        >
          <AppBar
            title="Tools"
            zDepth={0}
            iconElementLeft={<IconButton><NavigationClose /></IconButton>}
            onLeftIconButtonTouchTap={this.props.toggleMenu}
          />
          <CardDeck />
          <Divider />
          <div style={{ padding: 12 }}>
            <Checkbox
              label="Calculate distance"
              primary={true}
              onCheck={this.switchDistanceCalc}
            />
          </div>
          <Divider />
          <p style={{ paddingLeft: 12 }}>Edit highlight</p>
          <RadioButtonGroup
            name="team"
            defaultSelected={0}
            onChange={this.onSelectTeam}
            style={{
              paddingLeft: 12
            }}
          >
            <RadioButton
              style={style}
              value={0}
              label="Team 1"
            />
            <RadioButton
              style={style}
              value={1}
              label="Team 2"
            />
          </RadioButtonGroup>
        </Popover>
        <Map
          google={this.props.google}
          onClick={this.onClick}
          center={center}
          zoom={2}
        >
          <DistanceCalc
            google={this.props.google}
            ref={node => {
              this.distanceCalc = node;
            }}
          />
          <HighlightLayer
            google={this.props.google}
            ref={node => {
              this.highlightLayer = node;
            }}
          />
        </Map>
      </div>
    );
  }

  onClick = (props, map, event) => {
    event.stop();
    if (!this.distanceCalc || !this.highlightLayer) {
      return;
    }
    if (this.isDistanceCalcEnabled) {
      this.distanceCalc.onMapClick(props, map, event);
    } else {
      this.highlightLayer.onMapClick(props, map, event, this.teamSelected);
    }
  };

  switchDistanceCalc = (event, isDistanceCalcEnabled) => {
    this.isDistanceCalcEnabled = isDistanceCalcEnabled;
  };

  onSelectTeam = (event, value) => {
    this.teamSelected = value;
  };
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBYB1G3Kc7XlOvlWN_v5SC7mYJcCSZgKtY',
  libraries: ['geometry', 'places']
})(MapContainer);