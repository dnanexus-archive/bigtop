import 'aframe';
import 'aframe-particle-system-component';
import {Entity} from 'aframe-react';
import React, {Component} from 'react';
import Branches from 'components/atoms/Branches';
import * as R from 'ramda';

class Forest extends Component {
  render() {
    const {
      coordinates,
      radius,
      height,
      rotate
    } = this.props;

    let forest = R.map(function(d) {
      return (<Branches key={d.id} datum={d} radius={radius} height={height} rotate={rotate} />) 
    }, coordinates);

    return (
      <Entity>
        {forest}
      </Entity>
    );  
  }
}

export default Forest;
