import React from 'react';
import {asset, View, Cylinder, Sphere} from 'react-vr';

export default class Pedestal extends React.Component {
  render() {
    return (
      <View>
        <Cylinder
          radiusTop={30}
          radiusBottom={30}
          dimHeight={50}
          segments={24}
          lit={true}
          style={{transform: [{translate: [0, -50, -150]}]}}
        ></Cylinder>
        <Sphere
          radius={20}
          lit={true}
          style={{
            color: "#9970d8",
            transform: [{translate: [0, -5, -150]}]
          }}
        ></Sphere>
      </View>
    )
  }
}

