import React from 'react';
import { Drawer, withStyles } from '@material-ui/core';
import styles from './RightPanel.styles';
import TeamInfo from 'components/TeamInfo';

class RightPanel extends React.Component {
  render () {
    const { classes } = this.props;
    return (
      <Drawer
        classes={classes}
        anchor="right"
        variant="permanent"
      >
        <TeamInfo />
      </Drawer>
    );
  }
}

export default withStyles(styles)(RightPanel);