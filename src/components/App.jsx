import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MapContainer from './MapContainer.jsx';

class App extends React.Component {
    render () {
        return (
            <MuiThemeProvider>
                <div>
                    <p>This WWIII game that I cannot get out of my head</p>
                    <MapContainer />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;