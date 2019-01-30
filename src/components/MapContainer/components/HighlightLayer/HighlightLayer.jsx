import React from 'react';

import FusionTablesLayer from './components/FusionTablesLayer';
import { selectModeClickStream } from 'services/map';
import { selectCountry, countriesStream, localSearch } from 'services/teams/countries';
import { search } from 'services/countries';
import { getTeams } from 'services/teams/teams';

class HighlightLayer extends React.Component {
  state = {
    countries: [],
    teams: [],
    loading: true
  }

  componentDidMount () {
    getTeams().then(teams => this.setState({ teams }));
    countriesStream.onValue(this.applyState);
    selectModeClickStream.onValue(this.onMapClick);
  }

  render () {
    if (this.state.loading) {
      return null;
    }
    const allCountries = this.state.countries;
    if (!allCountries || !allCountries.length) {
      return null;
    }
    const styles = [
      {
        polygonOptions: {
          fillColor: this.getTeamById('1').Color,
          fillOpacity: 0.2
        }
      }
    ];
    if (this.getCountriesInTeam('2').length) {
      styles.push({
        where: `Name IN (${this.getCountryString(this.getCountriesInTeam('2'))})`,
        polygonOptions: {
          fillColor: this.getTeamById('2').Color,
          fillOpacity: 0.2
        }
      });
    }
    return (
      <div>
        <FusionTablesLayer
          {...this.props}
          query={{
            select: 'geometry',
            from: '1N2LBk4JHwWpOY4d9fobIn27lfnZ5MDy-NoqqRpk',
            where: `Name IN (${this.getCountryString(allCountries)})`
          }}
          styles={styles}
          clickable={false}
          suppressInfoWindows={true}
        />
      </div>
    );
  }

  applyState = countries => {
    this.setState({ countries });
  }

  getHqs () {
    return this.state.countries.filter(({ Specials }) => Specials === 'HQ');
  }

  getAllies () {
    return this.state.teams.map(({ allies }) => allies).reduce((prev, curr) => {
      return prev.concat(curr);
    }, []);
  }

  getTeamById (id) {
    return this.state.teams.find(team => team._id === id);
  }

  getCountriesInTeam (id) {
    return this.state.countries.filter(country => country.Team._id === id);
  }

  getCountryString (countries) {
    return countries.map(({ Name }) => `'${Name.trim()}'`).join(',');
  }

  onMapClick = ({ event }) => {
    this.getCountryName(event.latLng).then(countryName => {
      const country = localSearch({ Name: countryName });
      if (country) {
        return Promise.resolve([country]);
      }
      return search(countryName);
    }).then(countries => {
      const country = countries[0] || {};
      selectCountry(country);
    });
  }

  getCountryName (latLng) {
    const wrappedGeocodePromise = config => {
      return new Promise((resolve, reject) => {
        const geocode = this.props.google.maps.Geocoder.prototype.geocode;
        geocode(config, (results, status) => {
          if (status !== 'OK') {
            reject(status);
            return;
          }
          resolve(results);
        });
      });
    };
    return wrappedGeocodePromise({
      location: {
        lat: latLng.lat(),
        lng: latLng.lng()
      }
    }).then(results => {
      const country = results.find(result => {
        return result.types.find(type => type === 'country');
      });
      if (!country) {
        throw new Error('Cant find country');
      }
      return country.address_components[0].long_name;
    });
  }
}

export default HighlightLayer;