import 'aframe';
import 'aframe-particle-system-component';
import {Entity} from 'aframe-react';
import * as R from 'ramda';
import React, {Component} from 'react';
import {polarToCartesian} from 'utils';

class CylindricalPanel extends Component {
  render() {

  const {
    ticks,
    chrom,
    radius
  } = this.props;

  let {x, z} = polarToCartesian(radius, chrom.scaledStart * (2 * Math.PI));

  return (
    <Entity>
      {R.map(tick => 
        (<Entity
          key={tick.value}
          text={{value: tick.value, align: "center", width: 4}}
          position={{y: tick.position, x: x, z: z}}
          rotation={`0 ${360 - (chrom.scaledStart * 360)} 0`}
        />), ticks)
      }
    </Entity>
  );
  }
}

export default CylindricalPanel;
