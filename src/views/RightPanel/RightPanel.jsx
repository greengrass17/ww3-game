import React from 'react';
import { Drawer } from 'material-ui';
import CountryInfo from 'components/CountryInfo';

class RightPanel extends React.Component {
  render () {
    return (
      <Drawer
        open={true}
        zDepth={1}
        openSecondary={true}
        width={220}
      >
        <CountryInfo/>
      </Drawer>
    );
  }
}

export default RightPanel;