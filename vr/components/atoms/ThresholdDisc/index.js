import React from 'react';
import {Cylinder} from 'react-vr';
import {connect} from 'react-redux';

ThresholdDisc = (props) => {
  let {radius, threshold, eyeHeight} = props;

  let eyeThresholdScale = eyeHeight / (1 - 1e-7);

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

mapStateToProps = (state) => {
  return {
    radius: state.world.radius,
    eyeHeight: state.world.eyeHeight,
    threshold: state.user.pCutoff
  }
}

export default connect(mapStateToProps)(ThresholdDisc);
