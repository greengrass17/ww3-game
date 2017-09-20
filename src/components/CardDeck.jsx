import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';

import { getRandom } from 'services/countries';

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

    @autobind
    randomCountry () {
        getRandom(1).then(([country]) => {
            this.context.showCard({
                title: country.Name,
                text: this.renderCountryInfo(country)
            });
        });
    }

    renderCountryInfo (country) {
        const {
            HumanPopulation,
            Ranking,
            NaturalResource,
            Technology,
            Military,
            Morale,
            Logistic,
            ScaleOfBattle,
            BattlePrice
        } = country;
        return (
            <div>
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

CardDeck.contextTypes = {
    showCard: PropTypes.func
};

export default CardDeck;