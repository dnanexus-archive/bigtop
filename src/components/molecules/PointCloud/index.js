import 'aframe';
import 'aframe-particle-system-component';
import {Entity} from 'aframe-react';
import React, {Component} from 'react';
import Point from 'components/atoms/Point';
import * as R from 'ramda';

class PointCloud extends Component {
  render() {
    const {
      data,
      height
    } = this.props;

    let points = R.map(function(d) {
      return (<Point key={d.id} datum={d} />)
    }, data);

    return (
      <Entity position={{y: -height/2, x: 0, z: 0}}>
        {points}
      </Entity>
    );
  }
}

export default PointCloud;
