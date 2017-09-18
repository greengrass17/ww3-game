import React from 'react';

class FusionTablesLayer extends React.Component {
    render () {
        return null;
    }

    componentDidMount () {
        this.renderLayer();
    }

    componentDidUpdate (prevProps) {
        if (this.props.map !== prevProps.map) {
            this.renderLayer();
        }
    }

    renderLayer () {
        const {
            google,
            map,
            query,
            styles,
            suppressInfoWindows
        } = this.props;

        if (!google) {
            return null;
        }

        const params = {
            map,
            query,
            styles,
            suppressInfoWindows
        };

        this.layer = new google.maps.FusionTablesLayer(params);
    }

    getLayer () {
        return this.layer;
    }
}

export default FusionTablesLayer;