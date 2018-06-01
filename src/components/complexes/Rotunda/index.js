import 'aframe';
import 'aframe-particle-system-component';
import {Entity} from 'aframe-react';
import React, {Component} from 'react';
import * as R from 'ramda';
import CylindricalPanel from 'components/atoms/CylindricalPanel';

class Rotunda extends Component {
  render() {
    const {
      radius,
      height,
      chromDict,
      colorScheme
    } = this.props;

    return (
      <Entity scale={{x: 1, y: -1, z: -1}}>
        {
          R.compose(
            R.map(
              d => <CylindricalPanel
                key={d.index}
                radius={radius}
                height={height}
                color={colorScheme[d.index]}
                start={d.scaledStart * 360}
                length={(d.scaledEnd-d.scaledStart) * 360}
              />),
            R.values
          )(chromDict)
        }
      </Entity>
    );
  }
}

export default Rotunda;
