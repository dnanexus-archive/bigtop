import 'aframe';
import {Entity} from 'aframe-react';
import React, {Component} from 'react';

class InfoPanel extends Component {
  render() {
    return (
      <Entity
        geometry={{primitive: 'plane', height: 0.25, width: 0.4}}
        material={{color: 'black', opacity: 0.4}} 
        {...this.props}
      >
        {this.props.children}
      </Entity>
    );
  }
}

export default InfoPanel;
