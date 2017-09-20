import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import autobind from 'autobind-decorator';

import MapContainer from './MapContainer.jsx';
import Popup from './Popup.jsx';

const style = {
    fontFamily: 'Roboto',
    height: '100%'
};

class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = { isMenuOpened: true };
    }

    render () {
        return (
            <MuiThemeProvider>
                <Popup style={style}>
                    <AppBar
                        title="This Stupid WWIII Game (TM)"
                        onLeftIconButtonTouchTap={this.toggleMenu}
                        onTitleTouchTap={this.toggleMenu}
                        zDepth={0}
                        style={{
                            position: 'fixed'
                        }}
                    />
                    <MapContainer
                        isMenuOpened={this.state.isMenuOpened}
                        toggleMenu={this.toggleMenu}
                    />
                </Popup>
            </MuiThemeProvider>
        );
    }

    @autobind
    toggleMenu () {
        this.setState({ isMenuOpened: !this.state.isMenuOpened });
    }
}

export default App;