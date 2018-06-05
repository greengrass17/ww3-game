import React from 'react';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';

import CardDeck from 'components/CardDeck';
import { changeMode } from 'services/map';
import { start, getAllies } from 'services/game';

class LeftPanel extends React.Component {
  state = {
    isRulerEnabled: false
  }

  render () {
    return (
      <Drawer
        open={true}
        zDepth={1}
        width={220}
      >
        <CardDeck type="advantage" teamId="1" />
        <CardDeck type="event" teamId="1" />
        <Divider />
        <div style={{ padding: 12 }}>
          <Checkbox
            label="Measure Logistic"
            primary={true}
            onCheck={this.toggleRuler}
          />
        </div>
        <FlatButton
          label="Start"
          onClick={this.onStart}
        />
        <FlatButton
          label="Form Allies"
          onClick={this.onFormAllies}
        />
      </Drawer>
    );
  }

  toggleRuler = (event, isRulerEnabled) => {
    this.setState({ isRulerEnabled });
    changeMode(isRulerEnabled ? 'ruler' : 'select');
  }

  onFormAllies () {
    getAllies();
  }

  onStart () {
    start();

  }
}

export default LeftPanel;