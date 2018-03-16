import React from 'react';
import {View, Cylinder, Plane, asset} from 'react-vr';

export default class ChromoPlatform extends React.Component {
  render() {
    return (
      <View>
        <Cylinder
          radiusTop={this.props.radius}
          radiusBottom={this.props.radius}
          dimHeight={0.1}
          segments={360}
          lit={true}
          style={{
            color: '#000',
            transform: [{translate: [0, -this.props.eyeHeight, 0]}],
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
            transform: [{translate: [0, -this.props.eyeHeight + 0.1, 0]}],
            opacity: 1
          }}
          texture={asset('marble.jpg')}
        ></Cylinder>
      </View>
    )
  }
}
