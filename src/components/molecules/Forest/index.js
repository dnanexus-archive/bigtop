import 'aframe';
import 'aframe-particle-system-component';
import {Entity} from 'aframe-react';
import React, {Component} from 'react';
import Branches from 'components/atoms/Branches';
import * as R from 'ramda';

class Forest extends Component {
  render() {
    const {
      data,
      height,
      rotate,
      radius
    } = this.props;

    let forest = R.map(function(d) {
      return (<Branches key={d.id} datum={d} height={height} rotate={rotate} radius={radius} />) 
    }, data);

    return (
      <Entity position={{y: -height/2, x: 0, z: 0}}>
        {forest}
      </Entity>
    );  
  }
}

export default Forest;
