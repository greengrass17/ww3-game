import React from 'react';
import { withStyles, Drawer } from '@material-ui/core';

import styles from './Footer.styles';
import CardInfo from 'components/CardInfo/CardInfo';
import ScoringBoard from 'components/ScoringBoard';

class Footer extends React.Component {
  render () {
    const { classes } = this.props;
    return (
      <Drawer variant="permanent" anchor="bottom" classes={classes}>
        <CardInfo className={classes.section1} />
        <ScoringBoard className={classes.section2} />
      </Drawer>
    );
  }
}

export default withStyles(styles)(Footer);