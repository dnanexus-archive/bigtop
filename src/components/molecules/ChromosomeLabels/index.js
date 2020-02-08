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
      <a-entity>
        {
          R.map(d =>
            {
              let {x, z} = polarToCartesian(radius, ((d.scaledStart + d.scaledEnd) / 2) * (2 * Math.PI));
              return (<a-text
                key={d.chrom}
                rotation={`0 ${360-((d.scaledStart + d.scaledEnd) / 2) * 360} 0`}
                font="fonts/Roboto-msdf.json"
                value={R.replace(/^chr/, '', d.chrom)}
                align="center"
                width="10"
                position={`${x} ${yPosition} ${z}`}
              />);
            }
          , chromList)
        }
      </a-entity>
    );
  }
}

export default ChromosomeLabels;
