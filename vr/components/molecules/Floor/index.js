import React from 'react';
import {View, Cylinder, Plane, asset} from 'react-vr';

export default class Floor extends React.Component {
  
  render() {
    const {
      chromDict,
      radius,
      eyeHeight
    } = this.props;

    return (
      <View>
        <Cylinder
          radiusTop={radius}
          radiusBottom={radius}
          dimHeight={0.1}
          segments={360}
          lit={true}
          style={{
            color: '#fff',
            transform: [{translate: [0, -eyeHeight, 0]}],
            opacity: 0.6
          }}
        ></Cylinder>
        <Cylinder
          radiusTop={60}
          radiusBottom={60}
          dimHeight={2}
          segments={72}
          style={{
            color: '#ffffff',
            transform: [{translate: [0, -eyeHeight + 0.1, 0]}],
            opacity: 1
          }}
          texture={asset('marble.jpg')}
        ></Cylinder>
      </View>
    )
  }
}
