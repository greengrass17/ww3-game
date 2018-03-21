import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';

import CountryCard from './Cards/Country.jsx';
import { getRandomHq, getRandomAllies } from 'services/countries';
import { Table, TableHeader, TableHeaderColumn, TableRow, TableBody, TableRowColumn } from 'material-ui/Table';

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
          label="Random an HQ"
          onClick={this.randomHq}
        />
        <FlatButton
          style={style}
          primary={true}
          label="Random an ally"
          onClick={this.randomAlly}
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
}

CardDeck.contextTypes = {
  showCard: PropTypes.func
};

export default CardDeck;