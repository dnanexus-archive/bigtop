import 'aframe';
import 'aframe-particle-system-component';
import {Entity} from 'aframe-react';
import React, {Component} from 'react';
import * as R from 'ramda';
import {polarToCartesian} from 'utils';

class ChromosomeLabels extends Component {
  render() {
    const {
      chromList,
      radius,
      yPosition
    } = this.props;

    return (
      <Entity>
        {
          R.map(d =>
            {
              let {x, z} = polarToCartesian(radius * 0.9, ((d.scaledStart + d.scaledEnd) / 2) * (2 * Math.PI));
              return (<Entity
                key={d.chrom}
                rotation={`0 ${360-((d.scaledStart + d.scaledEnd) / 2) * 360} 0`}
                text={{value: R.replace(/^chr/, '', d.chrom), align: "center", width: 10}}
                position={{y: yPosition, x: x, z: z}}
              />);
            }
          , chromList)
        }
      </Entity>
    );
  }
}

export default ChromosomeLabels;
