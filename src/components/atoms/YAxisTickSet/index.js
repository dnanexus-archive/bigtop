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
    <a-entity>
      {/* wall height tick marks: 10, 20, 30, etc. */}
      {R.map(tick =>
        (<a-text
          key={tick.value}
          font="fonts/Roboto-msdf.json"
          value={tick.value}
          align="center"
          width="5"
          color="black"
          position={`${x} ${tick.position} ${z}`}
          rotation={`0 ${360 - ((chrom.scaledStart + rightOfAxisOffset) * 360)} 0`}
        />), ticks)
      }
    </a-entity>
  );
  }
}

export default CylindricalPanel;
