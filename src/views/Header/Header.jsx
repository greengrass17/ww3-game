import React from 'react';
import styles from './Header.styles';
import { withStyles, Drawer } from '@material-ui/core';
import BattleField from '../../components/BattleField/BattleField';

class Header extends React.Component {
  render () {
    const { classes } = this.props;
    return (
      <Drawer classes={classes} elevation={20} anchor="top" variant="permanent">
        <BattleField />
      </Drawer>
    );
  }
}

export default withStyles(styles)(Header);