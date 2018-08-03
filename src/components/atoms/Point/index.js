import 'aframe';
import 'aframe-particle-system-component';
import {Entity} from 'aframe-react';
import React, {Component} from 'react';
import InfoPanel from 'components/molecules/InfoPanel';
import {polarToCartesian} from 'utils';    

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
      datum,
      height,
      radius
    } = this.props;

    let pointDistance = Math.sqrt(Math.pow(datum.coords[0], 2) + Math.pow(datum.coords[2], 2))
    var r = (datum.radius + radius) / 2
    let {x, z} = polarToCartesian(r, datum.theta);
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
        {this.state.active && <Entity geometry={{primitive: 'cylinder', radius: 0.01, thetaStart: 90, height: datum.coords[1], openEnded: true}} material={{color: 'white', shader: 'flat'}} position={{x: 0, y: -datum.coords[1]/2, z: 0}} /> } 
    >
        {this.state.active &&  <Entity geometry={{primitive: 'cylinder', radius: 0.01, thetaStart: 90, height: radius+datum.radius, openEnded: true}} material={{color: 'white', shader: 'flat'}} position={{x: x, y: 0, z: z}} rotation={{x:90, y: -((datum.theta*180) / Math.PI), z: 0}}  /> } 
     >
        {this.state.active && <InfoPanel position={{x: 0, y: 0.1 + (pointDistance / 40), z: 0}} scale={{x: pointDistance, y: pointDistance, z: pointDistance }} rotation={{x: 0, y: datum.theta * -57.2958, z: 0}} text={datum.id + "\n" + datum.gene} />} 
 
    </Entity>
    );
  }
}

export default Point;
