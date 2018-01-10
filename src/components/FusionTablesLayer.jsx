import React from 'react';

class FusionTablesLayer extends React.Component {
  render () {
    return null;
  }

  componentDidMount () {
    this.renderLayer();
  }

  componentDidUpdate () {
    if (this.props.map) {
      this.renderLayer();
    }
  }

  renderLayer (props) {
    const {
      google,
      map,
      query,
      styles,
      clickable,
      suppressInfoWindows
    } = props || this.props;

    if (!google) {
      return null;
    }

    const params = {
      map,
      query,
      styles,
      clickable,
      suppressInfoWindows
    };

    if (this.layer) {
      this.layer.setOptions(params);
      return;
    }

    this.layer = new google.maps.FusionTablesLayer(params);
  }

  getLayer () {
    return this.layer;
  }
}

export default FusionTablesLayer;