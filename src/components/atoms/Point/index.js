import 'aframe';
import 'aframe-particle-system-component';
import {Entity} from 'aframe-react';
import React, {Component} from 'react';

class Point extends Component {
  render() {

		const {
			datum
		} = this.props;

		console.log(datum);

    return (
      <Entity geometry={{primitive: 'sphere', radius: 0.05 }} material={{color: 'red'}} position={{x: datum.coords[0], y: datum.coords[1], z: datum.coords[2]}}/>
    );
  }
}

export default Point;
