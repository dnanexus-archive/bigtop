import 'aframe';
import 'aframe-particle-system-component';
import {Entity} from 'aframe-react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from './actions';

class Point extends Component {
  constructor() {
    super();
    
    this.onEnter = this.onEnter.bind(this);
  }

  onEnter() {
    this.props.setSelectedPoint(this.props.datum.id);
  }

  render() {
    const {
      datum,
      size
    } = this.props;

    return (
      <Entity
        id={datum.id}
				gene={datum.gene}
        geometry={{primitive: 'sphere', radius: size}}
        material={{color: 'teal'}}
        position={{x: datum.coords[0], y: datum.coords[1], z: datum.coords[2]}}
        events={{
          mouseenter: this.onEnter
        }}
      />
    );
  }
}

export default connect(null, actionCreators)(Point);
