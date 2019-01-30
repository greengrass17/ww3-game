import React from 'react';
import { withStyles } from '@material-ui/core';

import styles from './CardInfo.styles';

class CardInfo extends React.Component {
  render () {
    const { classes } = this.props;
    return (
      <div className={classes.container}>CardInfo</div>
    );
  }
}

export default withStyles(styles)(CardInfo);