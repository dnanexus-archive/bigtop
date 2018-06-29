import 'aframe';
import 'aframe-particle-system-component';
import {Entity} from 'aframe-react';
import React, {Component} from 'react';
import * as R from 'ramda';
import CylindricalPanel from 'components/atoms/CylindricalPanel';
import TickSet from 'components/atoms/TickSet';
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

    console.log("yScaleDomain:", yScaleDomain);
    let yScale = scaleLinear()
      .domain(yScaleDomain)
      .range([-height/2, height/2]);

    console.log("TO DO: Make a D3 axis and get calculated tick marks, then draw them. Then simulate points at different levels to check the tick marks line up correctly with the data.");
    let tickValues = yScale.ticks();
    let ticks = R.map(d => {return {value: d, position: yScale(d)}}, tickValues);

    return (
      <Entity>
        {
          R.map(d => {
            return (<Entity key={d.chrom}>
              <Entity scale={{x: 1, y: -1, z: -1}}>
                <CylindricalPanel
                  radius={radius}
                  height={height}
                  color={"black"}
                  start={d.scaledStart * 360}
                  length={0.3}
                  openEnded="true"
                  yPosition={yPosition}
                />
              </Entity>
              <TickSet ticks={ticks} chrom={d} radius={radius * 0.99} />
            </Entity>);
          }, chromList)
        }
      </Entity>
    );
  }
}

export default YAxes;
