import React, {Component} from 'react';
import * as R from 'ramda';
import CylindricalPanel from 'components/atoms/CylindricalPanel';

class ChromosomeWalls extends Component {
  render() {
    const {
      radius,
      height,
      chromList,
      colorScheme
    } = this.props;

    return (
      <a-entity scale="1 -1 -1">
        {
          R.map(d =>
            <CylindricalPanel
              key={d.chrom}
              radius={radius}
              height={height}
              color={colorScheme[d.index]}
              start={d.scaledStart * 360}
              length={(d.scaledEnd-d.scaledStart) * 360}
              openEnded="false"
            />
          , chromList)
        }
      </a-entity>
    );
  }
}

export default ChromosomeWalls;
