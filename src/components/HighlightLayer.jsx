import React from 'react';

import FusionTablesLayer from './FusionTablesLayer.jsx';

class HighlightLayer extends React.Component {
  state = {
    teams: [
      {
        name: 'Team 1',
        hq: 'Germany',
        allies: [],
        polygonOptions: {
          fillColor: '#FF0000',
          fillOpacity: 0.2
        }
      },
      {
        name: 'Team 2',
        hq: 'United States',
        allies: [],
        polygonOptions: {
          fillColor: '#0000FF',
          fillOpacity: 0.2
        }
      }
    ]
  }

  render () {
    const allCountries = this.getCountriesInTeam(0).concat(this.getCountriesInTeam(1));
    return (
      <div>
        <FusionTablesLayer
          {...this.props}
          query={{
            select: 'geometry',
            from: '1N2LBk4JHwWpOY4d9fobIn27lfnZ5MDy-NoqqRpk',
            where: `Name IN (${this.getCountryString(allCountries)})`
          }}
          styles={[{
            polygonOptions: this.state.teams[0].polygonOptions
          }, {
            where: `Name IN (${this.getCountryString(this.getCountriesInTeam(1))})`,
            polygonOptions: this.state.teams[1].polygonOptions
          }]}
          clickable={false}
          suppressInfoWindows={true}
        />
      </div>
    );
  }

  getHqs () {
    return this.state.teams.map(({ hq }) => hq);
  }

  getAllies () {
    return this.state.teams.map(({ allies }) => allies).reduce((prev, curr) => {
      return prev.concat(curr);
    }, []);
  }

  getCountriesInTeam (index) {
    return [this.state.teams[index].hq].concat(this.state.teams[index].allies);
  }

  getCountryString (countries) {
    return countries.map(country => `'${country}'`).join(',');
  }

  onMapClick (props, map, event, teamIndex) {
    this.getCountryName(event.latLng).then(countryName => {
      const state = { ...this.state };
      const hqs = this.getHqs();
      if (hqs.indexOf(countryName) > -1) {
        return;
      }
      const currTeamIndex = this.state.teams.findIndex((team, index) => {
        return this.getCountriesInTeam(index).indexOf(countryName) > -1;
      });

      // Remove selected country if it already in a team
      if (currTeamIndex > -1) {
        const currTeamCountries = state.teams[currTeamIndex].allies.filter(countryCode => countryCode !== countryName);
        state.teams[currTeamIndex].allies = currTeamCountries;
      }
      // Add selected country to new team
      if (currTeamIndex !== teamIndex) {
        const countries = [countryName].concat(this.state.teams[teamIndex].allies);
        state.teams[teamIndex].allies = countries;
      }
      this.setState(state);
    });
  }

  getCountryName (latLng) {
    const wrappedGeocodePromise = config => {
      return new Promise((resolve, reject) => {
        const geocode = this.props.google.maps.Geocoder.prototype.geocode;
        geocode(config, (results, status) => {
          if (status !== 'OK') {
            reject();
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