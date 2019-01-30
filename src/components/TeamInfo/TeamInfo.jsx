import React from 'react';
import { withStyles } from '@material-ui/core';
import styles from './TeamInfo.styles';
import { getTeams } from 'services/teams/teams';

class TeamInfo extends React.Component {
  state = {
    teams: []
  };

  render() {
    const { classes } = this.props;
    return <div className={classes.container}>TeamInfo</div>;
  }

  componentDidMount() {
    getTeams().then(teams => {
      this.setState({ teams });
    });
  }
}

export default withStyles(styles)(TeamInfo);
