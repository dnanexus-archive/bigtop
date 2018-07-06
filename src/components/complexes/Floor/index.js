import 'aframe';
import 'aframe-particle-system-component';
import {Entity} from 'aframe-react';
import React, {Component} from 'react';
import * as R from 'ramda';
import marble from 'data/marble.jpg';
import {scaleLinear} from 'd3-scale';
import RadiusAxes from 'components/molecules/RadiusAxes';

class Rotunda extends Component {
  render() {
    const {
      radius,
      yPosition,
      radiusScaleInfo
    } = this.props;

    // Note: the colored chromosome wedges on the floor are just the bottom of the cylinder in the Rotunda
    return (
      <Entity>
        <Entity
          geometry={{primitive: 'cylinder', radius: radius, height: 0.001}}
          material={{src: marble, transparent: true, opacity: 0.7}}
          position={`0 ${yPosition} 0`}
        />
        <RadiusAxes yPosition={yPosition * 0.99} radiusScaleInfo={radiusScaleInfo} />        
      </Entity>
    );
  }
}

export default Rotunda;
