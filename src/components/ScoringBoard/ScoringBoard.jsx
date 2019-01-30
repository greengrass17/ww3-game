import React from 'react';
import { withStyles } from '@material-ui/core';

import styles from './ScoringBoard.styles';

class ScoringBoard extends React.Component {
  render () {
    const { classes } = this.props;
    return (
      <div className={classes.container}>ScoringBoard</div>
    );
  }
}

export default withStyles(styles)(ScoringBoard);