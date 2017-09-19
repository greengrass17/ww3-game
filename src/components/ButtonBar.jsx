import React from 'react';

class ButtonBar extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            activeIndex: 0
        };
    }

    render () {
        return (
            <div>
                {this.renderChildren()}
            </div>
        );
    }

    renderChildren () {
        if (!this.props.children) {
            return;
        }
        return React.Children.map(this.props.children, (child, index) => {
            if (!child) {
                return;
            }
            return React.cloneElement(child, {
                onClick: this.onClick(child, index),
                active: index === this.state.activeIndex
            });
        });
    }

    onClick (child, index) {
        return (event) => {
            if (this.props.onActiveChange) {
                this.props.onActiveChange(this.state.activeIndex, index, child);
            }
            this.setState({ activeIndex : index });
            if (child.props.onClick) {
                child.props.onClick(event);
            }
        };
    }
}

export default ButtonBar;