import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MapContainer from './MapContainer.jsx';

import CardDeck from './CardDeck.jsx';

const style = {
    fontFamily: 'Roboto',
    height: '100%'
};

class App extends React.Component {
    render () {
        return (
            <MuiThemeProvider>
                <div style={style}>
                    <h2>This WWIII game that I cannot get out of my head</h2>
                    <CardDeck />
                    <MapContainer />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;