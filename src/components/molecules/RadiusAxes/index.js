import React, {Component} from 'react';
import * as R from 'ramda';
import {scaleLinear} from 'd3-scale';
import FloorAxisTick from 'components/atoms/FloorAxisTick';

class RadiusAxes extends Component {
  render() {
    const {
      yPosition,
      radiusScaleInfo,
      title
    } = this.props;

    let rScale = scaleLinear()
      .domain(radiusScaleInfo.domain)
      .range(radiusScaleInfo.range);

    let tickValues = rScale.ticks();
    let ticks = R.map(d => {return {value: d, position: rScale(d)}}, tickValues);

    return (
      <a-entity>
        {/* Radius axis: e.g. "Allele frequency" */}
        <a-text
          font="fonts/Roboto-msdf.json"
          value={title}
          align="center"
          width="10"
          color="black"
          position={`-0.5 ${yPosition + 0.001} ${-1*(radiusScaleInfo.range[1]/2)}`}
          rotation="270 0 93"
        />
        {
          R.map(function(d) {
            return (
              <FloorAxisTick
                key={d.value}
                value={d.value}
                radialPosition={d.position}
                yPosition={yPosition}
              />);
          }, ticks)
        }
      </a-entity>
    );
  }
}

export default RadiusAxes;
