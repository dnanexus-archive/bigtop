import 'aframe';
import 'aframe-particle-system-component';
import {Entity} from 'aframe-react';
import React, {Component} from 'react';
import * as R from 'ramda';
import CylindricalPanel from 'components/atoms/CylindricalPanel';

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

    return (
      <Entity scale={{x: 1, y: -1, z: -1}}>
        {
          R.map(d =>
            <Entity key={d.chrom}>
              <CylindricalPanel
                radius={radius}
                height={height}
                color={"black"}
                start={d.scaledStart * 360}
                length={0.3}
                openEnded="true"
                yPosition={yPosition}
              />
              {
                // ADD tick marks here
              }
            </Entity>
          , chromList)
        }
      </Entity>
    );
  }
}

export default YAxes;
