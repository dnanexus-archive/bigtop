import 'aframe';
import 'aframe-particle-system-component';
import {Entity} from 'aframe-react';
import React, {Component} from 'react';
import * as R from 'ramda';
import {scaleLinear} from 'd3-scale';
import FloorAxisTick from 'components/atoms/FloorAxisTick';

class YAxes extends Component {
  render() {
    const {
      yPosition,
      radiusScaleInfo
    } = this.props;

    let rScale = scaleLinear()
      .domain(radiusScaleInfo.domain)
      .range(radiusScaleInfo.range);

    let tickValues = rScale.ticks();
    let ticks = R.map(d => {return {value: d, position: rScale(d)}}, tickValues);

    return (
      <Entity>
        {
          R.map(function(d) {
            return (<FloorAxisTick key={d.value} value={d.value} radialPosition={d.position} yPosition={yPosition} />);
          }, ticks)
        }
      </Entity>
    );
  }
}

export default YAxes;
