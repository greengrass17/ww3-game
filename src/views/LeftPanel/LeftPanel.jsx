import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';

import CardDeck from 'components/CardDeck';
import { start, getAllies } from 'services/game';
import { fetchNextBattle } from '../../services/battles';

import styles from './LeftPanel.styles';

class LeftPanel extends React.Component {
  state = {
    battle: {
      Country: {}
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Drawer classes={classes} variant="permanent">
        <CardDeck type="advantage" teamId="1" />
        <Button onClick={this.onStart}>Start</Button>
        <Button onClick={this.onFormAllies}>Form Allies</Button>
        <Button onClick={this.fetchNextBattle}>Next Battle</Button>
        <Button onClick={this.selectWinner}>Select Winner</Button>
      </Drawer>
    );
  }

  onFormAllies() {
    getAllies();
  }

  onStart() {
    start();
  }

  fetchNextBattle = () => {
    fetchNextBattle().then(([battle]) => {
      this.setState({ battle });
    });
  }

  selectWinner = () => {
  }
}

export default withStyles(styles)(LeftPanel);
