import React from 'react';
import {Cylinder} from 'react-vr';

export default class ThresholdDisc extends React.Component {
  render() {
    let {radius, threshold, eyeHeight} = this.props;

    let eyeThresholdScale = eyeHeight / (1 - 1e-7);
    console.log(-eyeHeight + (threshold * eyeThresholdScale))

    return (
        <Cylinder
          radiusTop={radius}
          radiusBottom={radius}
          dimHeight={0.1}
          segments={72}
          lit={false}
          style={{
            transform: [{translate: [0, -eyeHeight + threshold * eyeThresholdScale, 0]}],
            color: '#ffffff',
            opacity: 0.03
          }}
        >
        </Cylinder>
    )
  }
}
