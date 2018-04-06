import React from 'react';
import {Sphere} from 'react-vr';

export default class Point extends React.Component {
  render() {
    let {cartesianCoords} = this.props;

    return (
        <Sphere
          radius={2}
          lit={true}
          style={{
            transform: [{translate: cartesianCoords}],
            color: '#ffff00'
          }}
        >
        </Sphere>
    )
  }
}
