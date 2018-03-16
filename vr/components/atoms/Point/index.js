import React from 'react';
import {View, Sphere} from 'react-vr';

export default class Point extends React.Component {
  render() {
    let {cartesianCoords} = this.props;

    return (
        <Sphere
          radius={2}
          lit={true}
          widthSegments={1}
          heightSegments={1}
          style={{
            color: "#ff0000",
            transform: [{translate: cartesianCoords}]
          }}
        >
        </Sphere>
    )
  }
}
