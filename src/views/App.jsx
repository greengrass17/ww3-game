import React from 'react';
import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles';

import MapContainer from 'components/MapContainer';
import Modal from 'components/Modal';
import RightPanel from './RightPanel';
import LeftPanel from './LeftPanel';
import Header from './Header';
import Footer from './Footer';

const theme = createMuiTheme({});

const styles = () => ({
  container: {
    fontFamily: 'Roboto',
    fontSize: '10pt',
    height: '100%'
  }
});

class App extends React.Component {
  state = {
    autoCompleteCountries: []
  };

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.container}>
          <Header />
          <LeftPanel />
          <MapContainer />
          <RightPanel />
          <Footer />
          <Modal />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
