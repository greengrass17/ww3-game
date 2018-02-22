import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import AutoComplete from 'material-ui/AutoComplete';

import MapContainer from './MapContainer.jsx';
import Popup from './Popup.jsx';
import CountryCard from './Cards/Country.jsx';
import { search } from '../services/countries';

const style = {
  fontFamily: 'Roboto',
  height: '100%'
};

class App extends React.Component {
  state = {
    isMenuOpened: true,
    autoCompleteCountries: []
  }

  render () {
    return (
      <MuiThemeProvider>
        <Popup style={style} ref={ref => {
          this.popup = ref;
        }}>
          <AppBar
            title="This Stupid WWIII Game (TM)"
            onLeftIconButtonTouchTap={this.toggleMenu}
            onTitleTouchTap={this.toggleMenu}
            iconElementRight={
              <AutoComplete
                dataSource={this.state.autoCompleteCountries}
                hintText="Search country"
                onUpdateInput={this.handleSearch}
                onNewRequest={this.handleCountrySelect}
                filter={this.countryFilter}
              />
            }
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

  toggleMenu = () => {
    this.setState({ isMenuOpened: !this.state.isMenuOpened });
  }

  countryFilter = (searchText) => {
    return searchText !== '' && searchText.length > 2;
  }

  handleSearch = (searchText) => {
    search(searchText).then(countries => {
      this.setState({
        autoCompleteCountries: countries.map(country => ({
          text: country.Name,
          value: country
        }))
      });
    });
  }

  handleCountrySelect = ({ value }) => {
    this.popup.showCard({
      title: value.Name,
      text: <CountryCard country={value}/>
    });
  }
}

export default App;