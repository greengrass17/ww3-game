import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';

import CountryCard from './Cards/Country.jsx';
import { getRandomHq, getRandomAllies } from 'services/countries';
import { Table, TableHeader, TableHeaderColumn, TableRow, TableBody, TableRowColumn } from 'material-ui/Table';
import { getAdvantageCards, getEventCards } from '../services/cards';

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
          label="Headquater"
          onClick={this.randomHq}
        />
        <FlatButton
          style={style}
          primary={true}
          label="5 allies"
          onClick={this.randomAlly}
        />
        <FlatButton
          style={style}
          primary={true}
          label="10 advantage cards"
          onClick={this.randomAdvCards}
        />
        <FlatButton
          style={style}
          primary={true}
          label="5 event cards"
          onClick={this.randomEveCards}
        />
      </div>
    );
  }

  randomHq = () => {
    getRandomHq().then(([country]) => {
      this.context.showCard({
        title: country.Name,
        text: <CountryCard country={country}/>
      });
    });
  }

  randomAlly = () => {
    getRandomAllies().then(countries => {
      this.context.showCard({
        title: "Allies",
        text: (
          <Table selectable={false}>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Total</TableHeaderColumn>
                <TableHeaderColumn>Human Population</TableHeaderColumn>
                <TableHeaderColumn>Natural Resources</TableHeaderColumn>
                <TableHeaderColumn>Military</TableHeaderColumn>
                <TableHeaderColumn>Logistic</TableHeaderColumn>
                <TableHeaderColumn>Scale of Battle</TableHeaderColumn>
                <TableHeaderColumn>Battle Price</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {countries.map(country => (
                <TableRow>
                  <TableRowColumn>{country.Name}</TableRowColumn>
                  <TableRowColumn>{country.Total}</TableRowColumn>
                  <TableRowColumn>{country.HumanPopulation}</TableRowColumn>
                  <TableRowColumn>{country.NaturalResources}</TableRowColumn>
                  <TableRowColumn>{country.Military}</TableRowColumn>
                  <TableRowColumn>{country.Logistic}</TableRowColumn>
                  <TableRowColumn>{country.ScaleOfBattle}</TableRowColumn>
                  <TableRowColumn>{country.BattlePrice}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      });
    });
  }

  randomEveCards = () => {
    getEventCards(5).then(cards => {
      this.context.showCard({
        title: 'Event cards',
        text: (
          <Table selectable={false}>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>Card Name</TableHeaderColumn>
                <TableHeaderColumn>Text</TableHeaderColumn>
                <TableHeaderColumn>Effect</TableHeaderColumn>
                <TableHeaderColumn>Use condition</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cards.map(({ CardName, CardText, CardEffect, CardCondition }) => (
                <TableRow>
                  <TableRowColumn>{CardName}</TableRowColumn>
                  <TableRowColumn>{CardText}</TableRowColumn>
                  <TableRowColumn>{CardEffect}</TableRowColumn>
                  <TableRowColumn>{CardCondition}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      });
    });
  }

  randomAdvCards = () => {
    getAdvantageCards(10).then(cards => {
      this.context.showCard({
        title: 'Advantage cards',
        text: (
          <Table selectable={false}>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>Card Name</TableHeaderColumn>
                <TableHeaderColumn>Text</TableHeaderColumn>
                <TableHeaderColumn>Effect</TableHeaderColumn>
                <TableHeaderColumn>Use condition</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cards.map(({ CardName, CardText, CardEffect, CardCondition }) => (
                <TableRow>
                  <TableRowColumn>{CardName}</TableRowColumn>
                  <TableRowColumn>{CardText}</TableRowColumn>
                  <TableRowColumn>{CardEffect}</TableRowColumn>
                  <TableRowColumn>{CardCondition}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      });
    });
  }
}

CardDeck.contextTypes = {
  showCard: PropTypes.func
};

export default CardDeck;