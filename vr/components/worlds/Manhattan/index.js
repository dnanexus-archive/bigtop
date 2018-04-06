import React from 'react';
import {asset, View, PointLight, AmbientLight} from 'react-vr';

export default class Manhattan extends React.Component {
  render() {
    return (
      <View>
        <PointLight
          intensity={0.5}
          style={{
            color: '#fff',
            transform: [{translate: [0, 100, 0]}]
          }}
        />
        <AmbientLight
          intensity={0.25}
          style={{
            color: '#fff'
          }}
        />
        {this.props.children}
      </View>
    )
  }
}

