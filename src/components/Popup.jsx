import React from 'react';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';

const cardStyle = {
    position: 'fixed',
    width: '50%',
    left: '50%',
    top: '50%',
    zIndex: 5,
    transform: 'translate3d(-50%, -50%, 0)'
};

class Popup extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            showed: false,
            title: '',
            text: null,
            actions: null
        };
    }

    render () {
        return (
            <div style={this.props.style}>
                {this.props.children}
                <Card style={{
                    ...cardStyle,
                    display: this.state.showed ? 'block' : 'none'
                }}>
                    <CardTitle title={this.state.title} />
                    <CardText>
                        {this.state.text}
                    </CardText>
                    <CardActions>
                        <FlatButton
                            label="Close"
                            secondary={true}
                            onClick={this.hideCard}
                        />
                        {this.state.actions}
                    </CardActions>
                </Card>
            </div>
        );
    }

    getChildContext () {
        return { showCard: this.showCard };
    }

    @autobind
    showCard (options) {
        this.setState({
            ...options,
            showed: true
        });
    }

    @autobind
    hideCard () {
        this.setState({ showed: false });
    }
}

Popup.childContextTypes = {
    showCard: PropTypes.func
};

export default Popup;