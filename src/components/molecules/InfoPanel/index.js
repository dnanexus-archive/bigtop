import 'aframe';
import {Entity} from 'aframe-react';
import React, {Component} from 'react';

class InfoPanel extends Component {
  render() {
    return (
      <Entity geometry={{primitive: 'box', height: 0.2, width: 0.2, depth: 0.2}} material={{color: 'blue'}} {...this.props}>
      </Entity>
    );
  }
}

export default InfoPanel;
