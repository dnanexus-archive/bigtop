import React, {Component} from 'react';

class InfoPanel extends Component {
  render() {
    return (
      <a-plane
        height="0.25"
        width="0.4"
        color="black"
        opacity="0.4"
        {...this.props}
      >
        {this.props.children}
      </a-plane>
    );
  }
}

export default InfoPanel;
