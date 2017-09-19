import React from 'react';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import autobind from 'autobind-decorator';

const cardStyle = {
    position: 'absolute',
    width: '50%',
    left: '50%',
    top: '50%',
    zIndex: 5,
    transform: 'translate3d(-50%, -50%, 0)'
};

const cardInfoStyle = {
    margin: 12
};

class CountryCard extends React.Component {
    render () {
        const {
            Name,
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
            <Card style={{
                ...cardStyle,
                display: Name ? 'block' : 'none'
            }}>
                <CardTitle title={Name} />
                <CardText>
                    <div style={cardInfoStyle}>Human Population: {HumanPopulation}</div>
                    <div style={cardInfoStyle}>Ranking: {Ranking}</div>
                    <div style={cardInfoStyle}>Natural Resource: {NaturalResource}</div>
                    <div style={cardInfoStyle}>Technology: {Technology}</div>
                    <div style={cardInfoStyle}>Military: {Military}</div>
                    <div style={cardInfoStyle}>Morale: {Morale}</div>
                    <div style={cardInfoStyle}>Logistic: {Logistic}</div>
                    <div style={cardInfoStyle}>Scale Of Battle: {ScaleOfBattle}</div>
                    <div style={cardInfoStyle}>Battle Price: {BattlePrice}</div>
                </CardText>
                <CardActions>
                    <FlatButton
                        label="Close"
                        secondary={true}
                        onClick={this.hideCard}
                    />
                </CardActions>
            </Card>
        );
    }

    @autobind
    hideCard () {
        this.props.resetCountry();
    }
}

export default CountryCard;