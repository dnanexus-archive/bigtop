import React from 'react';
import {asset, Cylinder, Sphere, Text, View, PointLight} from 'react-vr';

export default class Manhattan extends React.Component {
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
        <PointLight
          decay={2}
          style={{
            color: '#1482b1',
            transform: [{translate: [-50, 100, 0]}]
          }}
        ></PointLight>
        <PointLight
          decay={2}
          style={{
            color: '#82ae2f',
            transform: [{translate: [50, 100, 0]}]
          }}
        ></PointLight>
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

