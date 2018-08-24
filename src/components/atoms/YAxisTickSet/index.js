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

  let rightOfAxisOffset = 0.003; // fraction of circle

  let {x, z} = polarToCartesian(radius, (chrom.scaledStart + rightOfAxisOffset) * (2 * Math.PI));

  return (
    <Entity>
      {/* wall height tick marks: 10, 20, 30, etc. */}
      {R.map(tick =>
        (<Entity
          key={tick.value}
          // geometry={{primitive: "plane", height: "auto", width: 0.75}}
          // material="color: black"
          text={{value: tick.value, align: "center", width: 5, color: "black"}}
          position={{y: tick.position, x: x, z: z}}
          rotation={`0 ${360 - ((chrom.scaledStart + rightOfAxisOffset) * 360)} 0`}
        />), ticks)
      }
    </Entity>
  );
  }
}

export default CylindricalPanel;
