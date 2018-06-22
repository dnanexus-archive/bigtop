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

    console.log("chromList:", chromList);

    return (
      <Entity>
        {
          R.map(d =>
            {
              let {x, z} = polarToCartesian(radius, ((d.scaledStart + d.scaledEnd) / 2) * 360);
              return (<Entity
                key={d.chrom}
                // rotate=
                geometry={{primitive: "plane", width: 4}}
                text={{value: d.chrom}}
                // position={{x: radius * 0.9}}
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
