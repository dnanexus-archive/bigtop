import 'aframe';
import 'aframe-particle-system-component';
import {Entity} from 'aframe-react';
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
      <Entity>
        {/* Radius axis: e.g. "Allele frequency" */}
        <Entity
          text={{
            font: "fonts/Roboto-msdf.json",
            value: title,
            align: "center",
            width: 10,
            color: "black"
          }}
          // geometry={{primitive: "plane", height: "auto", width: 3.5}}
          // material="color: black"
          position={{x: -0.5, y: yPosition, z: -1*(radiusScaleInfo.range[1]/2)}}
          rotation={{x: 270, y: 0, z: 90}}
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
      </Entity>
    );
  }
}

export default RadiusAxes;
