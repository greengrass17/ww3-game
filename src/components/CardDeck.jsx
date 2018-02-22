import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';

import CountryCard from './Cards/Country.jsx';
import { getRandomHq } from 'services/countries';

const style = {
  margin: 12
};

class CardDeck extends React.Component {
  render () {
    return (
      <div>
        <FlatButton
          style={style}
          primary={true}
          label="Random a country"
          onClick={this.randomCountry}
        />
      </div>
    );
  }

  randomCountry = () => {
    getRandomHq().then((country) => {
      this.context.showCard({
        title: country.Name,
        text: <CountryCard country={country}/>
      });
    });
  }
}

CardDeck.contextTypes = {
  showCard: PropTypes.func
};

export default CardDeck;