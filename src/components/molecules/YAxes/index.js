import React, {Component} from 'react';
import * as R from 'ramda';
import CylindricalPanel from 'components/atoms/CylindricalPanel';
import YAxisTickSet from 'components/atoms/YAxisTickSet';
import {scaleLinear} from 'd3-scale';

class YAxes extends Component {
  render() {
    const {
      radius,
      height,
      chromList,
      yPosition,
      yScaleDomain
    } = this.props;

    let yScale = scaleLinear()
      .domain(yScaleDomain)
      .range([-height/2, height/2]);

    let tickValues = yScale.ticks();
    let ticks = R.map(d => {return {value: d, position: yScale(d)}}, tickValues);

    return (
      <a-entity>
        {
          R.map(d => {
            return (<a-entity key={d.chrom}>
              <a-entity scale="1 -1 -1">
                <CylindricalPanel
                  radius={radius}
                  height={height}
                  color="black"
                  start={d.scaledStart * 360}
                  length={0.3}
                  openEnded="true"
                  yPosition={yPosition}
                />
              </a-entity>
              <YAxisTickSet ticks={ticks} chrom={d} radius={radius * 0.99} />
            </a-entity>);
          }, chromList)
        }
      </a-entity>
    );
  }
}

export default YAxes;
