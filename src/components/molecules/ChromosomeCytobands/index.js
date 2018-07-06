import 'aframe';
import 'aframe-particle-system-component';
import {Entity} from 'aframe-react';
import React, {Component} from 'react';
import * as R from 'ramda';
import CylindricalPanel from 'components/atoms/CylindricalPanel';
import {scaleOrdinal} from 'd3-scale';

class ChromosomeCytobands extends Component {
  render() {
    const {
      cytobands,
      chromDict,
      radius,
      height,
      yPosition = 0
    } = this.props;

    let colorScale = scaleOrdinal()
      .domain(["gneg", "gpos25", "gpos50", "gpos75", "gpos100", "acen", "gvar", "stalk"])
      .range(["#fff", "#ccc", "#888", "#444", "#000", "red", "white", "teal"]);

    return (
      <Entity scale={{x: 1, y: -1, z: -1}}>
        {
          R.map(d => {
            let chrom = chromDict[d.chrom];
            let scaleFactor = (chrom.scaledEnd - chrom.scaledStart) / (chrom.size);

            return (
              <CylindricalPanel
                key={`${d.chrom}-${d.name}`}
                radius={radius}
                height={height}
                color={colorScale(d.stain)}
                start={(chrom.scaledStart + (scaleFactor * d.start)) * 360}
                length={scaleFactor * (d.end - d.start) * 360}
                yPosition={yPosition}
              />
            );
          }, cytobands)
        }
      </Entity>
    );
  }
}

export default ChromosomeCytobands;
