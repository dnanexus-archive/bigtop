import 'aframe';
import 'aframe-particle-system-component';
import {Entity} from 'aframe-react';
import React, {Component} from 'react';
import marble from 'data/marble.jpg';
import RadiusAxes from 'components/molecules/RadiusAxes';

class Floor extends Component {
  render() {
    const {
      radius,
      yPosition,
      radiusScaleInfo,
      radiusAxisTitle
    } = this.props;

    return (
      <Entity>
        <Entity
          geometry={{primitive: 'cylinder', radius: radius, height: 0.001}}
          material={{src: marble, transparent: true, opacity: 0.7}}
          position={`0 ${yPosition} 0`}
        />
        <RadiusAxes yPosition={yPosition * 0.99} radiusScaleInfo={radiusScaleInfo} title={radiusAxisTitle} />        
      </Entity>
    );
  }
}

export default Floor;
