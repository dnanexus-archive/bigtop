import 'aframe';
import 'aframe-particle-system-component';
import {Entity} from 'aframe-react';
import React, {Component} from 'react';
import InfoPanel from 'components/molecules/InfoPanel';

class Point extends Component {
  constructor() {
    super();
    this.state = {
      active: false
    };

    this.onEnter = this.onEnter.bind(this);
    this.onExit = this.onExit.bind(this);
  }

  onEnter() {
    this.setState({active: true});
  }

  onExit() {
    this.setState({active: false});
  }

  render() {
    const {
      datum
    } = this.props;

		let pointDistance = Math.sqrt(Math.pow(datum.coords[0], 2) + Math.pow(datum.coords[2], 2))

    return (
      <Entity
        id={datum.id}
        key={datum.id}
				gene={datum.gene}
        geometry={{primitive: 'sphere', radius: 0.03}}
        material={{color: this.state.active ? 'yellow' : 'teal'}}
        position={{x: datum.coords[0], y: datum.coords[1], z: datum.coords[2]}}
        events={{
          mouseenter: this.onEnter
//          mouseleave: this.onExit
        }}
      >
        {this.state.active && <InfoPanel position={{x: 0, y: 0.1 + (pointDistance / 40), z: 0}} scale={{x: pointDistance, y: pointDistance, z: pointDistance }} rotation={{x: 0, y: datum.theta * -57.2958, z: 0}} text={datum.id + "\n" + datum.gene} />}
      </Entity>
    );
  }
}

export default Point;
