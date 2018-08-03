import 'aframe';
import 'aframe-particle-system-component';
import {Entity} from 'aframe-react';
import React, {Component} from 'react';
import Point from 'components/atoms/Point';
import * as R from 'ramda';
import {scaleLinear} from 'd3-scale';

class PointCloud extends Component {
  render() {
    const {
      data,
      height,
      yScaleDomain,
      radius
    } = this.props;

    let pointSizeScale = scaleLinear()
      .domain([0, height])
      .range([0.01, 0.2]);

    let points = R.map(function(d) {
      return (<Point key={d.id} datum={d} size={pointSizeScale(d.coords[1])} radius={radius} />)
    }, data);

    return (
      <Entity position={{y: -height/2.0, x: 0, z: 0}}>
        {points}
      </Entity>
    );
  }
}

export default PointCloud;
