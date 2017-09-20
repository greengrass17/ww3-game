import React from 'react';
import { GoogleApiWrapper, Map } from 'google-maps-react';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import autobind from 'autobind-decorator';
import 'whatwg-fetch';

import DistanceCalc from './DistanceCalc.jsx';
import ButtonBar from './ButtonBar.jsx';
import HighlightLayer from './HighlightLayer.jsx';

const style = {
    margin: 12
};

class MapContainer extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            mode: 'highlight'
        };
        this.activeButtonIndex = 0;
        this.teamSelected = 0;
    }

    render () {
        const center = this.props.google ? new this.props.google.maps.LatLng(30, 0) : null;
        return (
            <div>
                <ButtonBar onActiveChange={this.onActiveButtonChange}>
                    <RaisedButton
                        label="Highlight alliance"
                        primary={true}
                        style={style}
                    />
                    <RaisedButton
                        label="Calculate distance"
                        primary={true}
                        style={style}
                    />
                </ButtonBar>
                <div>
                    <RadioButtonGroup
                        name="team"
                        defaultSelected={0}
                        onChange={this.onSelectTeam}
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
                </div>
                <Map
                    google={this.props.google}
                    onClick={this.onClick}
                    center={center}
                    zoom={2}
                >
                    <DistanceCalc
                        ref={node => {
                            this.distanceCalc = node;
                        }}
                    />
                    <HighlightLayer
                        ref={node => {
                            this.highlightLayer = node;
                        }}
                    />
                </Map>
            </div>
        );
    }

    @autobind
    onClick (props, map, event) {
        event.stop();
        switch (this.activeButtonIndex) {
            case 0:
                this.highlightLayer.onMapClick(props, map, event, this.teamSelected);
                break;
            case 1:
                this.distanceCalc.onMapClick(props, map, event);
                break;
            default:
                break;
        }
    }

    @autobind
    onActiveButtonChange (prevIndex, currIndex, activeButton) {
        this.activeButtonIndex = currIndex;
        console.log(activeButton);
    }

    @autobind
    onSelectTeam (event, value) {
        this.teamSelected = value;
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBYB1G3Kc7XlOvlWN_v5SC7mYJcCSZgKtY',
    libraries: ['geometry', 'places']
})(MapContainer);