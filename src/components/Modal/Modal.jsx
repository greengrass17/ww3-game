import React from 'react';
import { onValue, offValue, addModal } from './utils/modalStream';

const cardStyle = {
  position: "fixed",
  width: "100%",
  bottom: 0,
  left: 0,
  "zIndex": 5,
  paddingLeft: 220,
  paddingRight: 220,
  background: "#eaeaea",
  "box-sizing": "border-box"
};

class Modal extends React.Component {
  state = {
    isOpen: false,
    title: '',
    content: null,
    actions: null
  }

  componentDidMount () {
    onValue(this.applyState);
  }

  componentWillUnmount () {
    offValue(this.applyState);
  }

  render () {
    if (!this.state.isOpen) {
      return null;
    }

    return (
      <div style={cardStyle}>
        <div>{this.state.title}</div>
        <div>
          {this.state.content}
        </div>
        <div>
          <button onClick={this.hideCard}>Close</button>
          {this.state.actions}
        </div>
      </div>
    );
  }

  applyState = (state) => {
    this.setState(state);
  }

  hideCard () {
    addModal({ isOpen: false });
  }
}

export default Modal;