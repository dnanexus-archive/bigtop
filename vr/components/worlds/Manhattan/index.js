import React from 'react';
import {asset, View, PointLight, AmbientLight} from 'react-vr';

export default class Manhattan extends React.Component {
  render() {
    return (
      <View>
        <PointLight
          intensity={3}
          style={{
            color: '#fff',
            transform: [{translate: [0, 100, 0]}]
          }}
        />
        <AmbientLight />
        {this.props.children}
      </View>
    )
  }
}

