import 'aframe-particle-system-component';
import React, {Component} from 'react';
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
      <a-entity>
        <a-cylinder
          radius-top={radius}
          radius-bottom={radius}
          height="0.001"
          opacity="0.7"
          position={`0 ${yPosition} 0`}
        />
        <RadiusAxes yPosition={yPosition * 0.99} radiusScaleInfo={radiusScaleInfo} title={radiusAxisTitle} />
      </a-entity>
    );
  }
}

export default Floor;
