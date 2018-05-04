import React from 'react';
import {View, CylindricalPanel} from 'react-vr';
import {connect} from 'react-redux';
import R from 'ramda';
import ChromosomeRing from '../../molecules/ChromosomeRing';

class Rotunda extends React.Component {
  render() {
    const {
      radius,
      eyeHeight,
      chromDict,
      colorScheme,
      yScaleDomain
    } = this.props;

    const colors = colorScheme;

    const containerStyle = {
      transform: [
        {rotateY: -180},
        {translate: [0, -eyeHeight + 0.1, 0]}
      ],
    };

    const cylWidth = 4096; // 4096 is the max allowed
    const cylHeight = 1000; // 1000 is the max allowed
 

    const cylPanelLayer = {width: cylWidth, height: cylHeight, density: cylWidth, radius: radius};

    const cylPanelStyle = function(index) {
      return {
        position: 'absolute',
        transform: [
          {rotateY: -180},
          {translate: [0, (radius*0.7 * index), 0]}
        ],
      };
    };

    return (
      <View style={containerStyle}>
        {R.map(index => (
          <CylindricalPanel key={index} layer={cylPanelLayer} style={cylPanelStyle(index)}>
            <ChromosomeRing
              labeled={index === 0}
              chromList={R.values(chromDict)}
              yScaleDomain={yScaleDomain}
              radius={radius}
              colors={colors}
              cylWidth={cylWidth}
              cylHeight={cylHeight}
            />
          </CylindricalPanel>
        ), R.range(-5, 20))}
      </View>
    )
  }
}

mapStateToProps = (state) => {
  return {
    radius: state.world.radius,
    eyeHeight: state.world.eyeHeight,
    chromDict: state.reference.chromDict,
    colorScheme: state.reference.colorScheme
  }
}

export default connect(mapStateToProps)(Rotunda);