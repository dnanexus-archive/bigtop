import 'aframe';
import 'aframe-particle-system-component';
import {Entity} from 'aframe-react';
import React, {Component} from 'react';
import Point from 'components/atoms/Point';
import * as R from 'ramda';

class PointCloud extends Component {
  render() {
    const {
      data
    } = this.props;

    let points = R.map(function(d) {
      return (<Point key={d.id} datum={d} />)
    }, data);

    return (
      <Entity>
        {points}
      </Entity>
    );
  }
}

export default PointCloud;
