import React, {Component} from 'react';

class InfoPanel extends Component {
  render() {
    const {children, ...props} = this.props;

    return (
      <a-plane
        height="0.25"
        width="0.4"
        color="black"
        opacity="0.4"
        {...props}
      >
        {children}
      </a-plane>
    );
  }
}

export default InfoPanel;
