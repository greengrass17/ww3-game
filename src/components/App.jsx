import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MapContainer from './MapContainer.jsx';

class App extends React.Component {
    render () {
        return (
            <MuiThemeProvider>
                <div>
                    <h2>This WWIII game that I cannot get out of my head</h2>
                    <MapContainer />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;