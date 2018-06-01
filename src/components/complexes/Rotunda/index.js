import 'aframe';
import 'aframe-particle-system-component';
import {Entity} from 'aframe-react';
import React, {Component} from 'react';

class Rotunda extends Component {
  render() {
    return (
      <Entity geometry={{primitive: 'plane'}} material={{color: 'red'}} position={{x: 0, y: -5, z: 0}}/>
    );
  }
}

export default Rotunda;
