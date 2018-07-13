import 'aframe';
import 'aframe-particle-system-component';
import {Entity} from 'aframe-react';
import React, {Component} from 'react';

class CylindricalPanel extends Component {
  render() {

  const {
    start,
    length,
    radius,
    height,
    color,
    yPosition = 0,
    openEnded = true
  } = this.props;

  return (
    <Entity
      geometry={{
        primitive: 'cylinder',
        openEnded: openEnded,
        thetaStart: start,
        thetaLength: length,
        radius: radius,
        height: height
      }}
      material={{color: color, side: "double"}}
      position={{x: 0, y: yPosition, z: 0}}
      />
    );
  }
}

export default CylindricalPanel;
