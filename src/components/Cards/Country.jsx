import React from 'react';

const style = {
  margin: 12
};

class CountryCard extends React.Component {
  render () {
    const {
      Total,
      HumanPopulation,
      Ranking,
      NaturalResource,
      Technology,
      Military,
      Morale,
      Logistic,
      ScaleOfBattle,
      BattlePrice
    } = this.props.country;
    return (
      <div>
        <div style={style}>Total: {Total}</div>
        <div style={style}>Human Population: {HumanPopulation}</div>
        <div style={style}>Ranking: {Ranking}</div>
        <div style={style}>Natural Resource: {NaturalResource}</div>
        <div style={style}>Technology: {Technology}</div>
        <div style={style}>Military: {Military}</div>
        <div style={style}>Morale: {Morale}</div>
        <div style={style}>Logistic: {Logistic}</div>
        <div style={style}>Scale Of Battle: {ScaleOfBattle}</div>
        <div style={style}>Battle Price: {BattlePrice}</div>
      </div>
    );
  }
}

export default CountryCard;