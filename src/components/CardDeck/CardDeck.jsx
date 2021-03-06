import React from 'react';

import { streams } from 'services/teams/cards';
import enums from 'services/enums';

class CardDeck extends React.Component {
  state = {
    cards: []
  }

  componentDidMount () {
    const key = enums[`card.${this.props.type}.key`];
    const cardsStream = streams[`${this.props.teamId}.${key}`];
    cardsStream.onValue(this.applyState);
  }

  render () {
    return (
      <div>
        <strong>{enums[`card.${this.props.type}.title`]}</strong>
        <div>
          {this.state.cards.map(card => (
            <div key={card.CardName}>{card.CardName}</div>
          ))}
        </div>
      </div>
    );
  }

  applyState = (cards) => {
    this.setState({ cards });
  }
}

export default CardDeck;