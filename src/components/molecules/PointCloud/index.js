import 'aframe';
import {Entity} from 'aframe-react';
import React, {Component} from 'react';
import Point from 'components/atoms/Point';
import SelectedPoint from 'components/molecules/SelectedPoint';
import * as R from 'ramda';
import {scaleLinear} from 'd3-scale';
import {shadeColor} from 'utils';

class PointCloud extends Component {
  render() {
    const {
      data,
      height,
      radius,
      pCutoff,
      chromosomes
    } = this.props;

    const pointSizeScale = scaleLinear()
      .domain([0, height])
      .range([0.01, 0.2]);

    const chrColors = R.map((chr) => shadeColor(chr.color, -0.25), R.indexBy(R.prop('label'), chromosomes));

    let points = R.map((d) => (
      <Point
        key={d.id}
        datum={d}
        pCutoff={pCutoff}
        color={chrColors[d.chr]}
        size={pointSizeScale(d.coords[1])}
        radius={radius}
      />
    ), data);

    return (
      <Entity position={{y: -height/2.0, x: 0, z: 0}}>
        {points}
        <SelectedPoint points={data} radius={radius} sizeScaler={pointSizeScale} />
      </Entity>
    );
  }
}

export default PointCloud;
