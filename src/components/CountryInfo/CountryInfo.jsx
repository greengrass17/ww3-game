import React from 'react';
import { onSelectCountry } from 'services/teams/countries';

class CountryInfo extends React.Component {
  state = {
    country: {}
  }

  render () {
    const { country } = this.state;
    return (
      <div>
        <div>{country.Team && country.Team.Name}</div>
        <div>{country.Name}</div>
        {country.Specials === 'HQ' &&
          <div>*</div>
        }
        <div>
          <div>TOTAL: {country.Total}</div>
          <div>PRICE: {country.BattlePrice}</div>
          <div>Logistic: {country.Logistic}</div>
          <div>Scale: {country.ScaleOfBattle}</div>
        </div>
      </div>
    );
  }

  applyState = (country) => {
    this.setState({ country });
  }

  componentDidMount () {
    onSelectCountry(this.applyState);
  }
}

export default CountryInfo;