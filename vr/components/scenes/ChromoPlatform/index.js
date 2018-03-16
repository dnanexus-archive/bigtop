import React from 'react';
import {View, Cylinder, Plane} from 'react-vr';

export default class ChromoPlatform extends React.Component {
  render() {
    return (
      <View>
        <Cylinder
          radiusTop={this.props.radius}
          radiusBottom={this.props.radius}
          dimHeight={1}
          segments={360}
          lit={true}
          style={{
            color: '#000',
            transform: [{translate: [0, -this.props.eyeHeight, 0]}],
            opacity: 0.6
          }}
        ></Cylinder>
      </View>
    )
  }
}
