import React from 'react';
import { withStyles } from '@material-ui/core';
import CountryInfo from '../CountryInfo';
import { fetchNextBattle } from '../../services/battles';

import styles from './BattleField.styles';

class BattleField extends React.Component {
  state = {
    battle: {
      Country: {}
    }
  };

  render() {
    const { classes } = this.props;
    const { battle } = this.state;
    return (
      <div className={classes.container}>
        <div className={classes.section1}>
          <div>BattleField</div>
        </div>
        <div className={classes.section2}>
          <CountryInfo variant="detailed" country={battle.Country} />
        </div>
        <div className={classes.section3}>
          <div>Eligible for battle</div>
        </div>
        <div className={classes.section4}>
          <div>Stack</div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    fetchNextBattle().then(([battle]) => {
      this.setState({ battle });
    });
  }
}

export default withStyles(styles)(BattleField);
