import React from 'react';
import { withStyles } from '@material-ui/core';
// import { onSelectCountry } from 'services/teams/countries';

import styles from './CountryInfo.styles';

class CountryInfo extends React.Component {
  // state = {
  //   country: this.props.country || {}
  // }

  render () {
    const { country, classes } = this.props;
    return (
      <div>
        <div>{country.Team && country.Team.Name}</div>
        <div className={classes.name}>{country.Name}</div>
        {country.Specials === 'HQ' &&
          <div>*</div>
        }
        <div className={classes.infoDetailed}>
          <div>Human Resources: {country.HumanPopulation}</div>
          <div>Natural Resources: {country.NaturalResources}</div>
          <div>Military: {country.Military}</div>
        </div>
        <div className={classes.info}>
          <div>TOTAL: {country.Total}</div>
          <div>PRICE: {country.BattlePrice}</div>
          <div>Logistic: {country.Logistic}</div>
          <div>Scale: {country.ScaleOfBattle}</div>
        </div>
      </div>
    );
  }

  // applyState = (country) => {
  //   this.setState({ country });
  // }

  // componentDidMount () {
  //   onSelectCountry(this.applyState);
  // }
}

export default withStyles(styles)(CountryInfo);