import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import autobind from 'autobind-decorator';

import CountryCard from './CountryCard.jsx';
import { getRandom } from 'services/countries';

const style = {
    margin: 12
};

class CardDeck extends React.Component {
    constructor (props) {
        super(props);
        this.state = { country: {} };
    }

    render () {
        return (
            <div>
                <CountryCard
                    country={this.state.country}
                    resetCountry={this.resetCountry}
                />
                <RaisedButton
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
            this.setState({ country });
        });
    }

    @autobind
    resetCountry () {
        this.setState({ country: {} });
    }
}

export default CardDeck;