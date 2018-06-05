import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

import MapContainer from 'components/MapContainer';
import Modal from 'components/Modal';
import RightPanel from './RightPanel';
import LeftPanel from './LeftPanel';
import SearchBar from 'components/SearchBar';

const style = {
  container: {
    fontFamily: 'Roboto',
    height: '100%'
  }
};

class App extends React.Component {
  state = {
    autoCompleteCountries: []
  }

  render () {
    return (
      <MuiThemeProvider>
        <div style={style.container}>
          <AppBar
            title="This Stupid WWIII Game (TM)"
            iconElementRight={<SearchBar/>}
            zDepth={0}
            style={{
              position: 'fixed'
            }}
          />
          <LeftPanel/>
          <MapContainer/>
          <RightPanel/>
          <Modal/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;