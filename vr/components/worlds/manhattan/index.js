import React from 'react';
import {asset, View, PointLight} from 'react-vr';

export default class Manhattan extends React.Component {
  render() {
    return (
      <View>
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
        {this.props.children}
      </View>
    )
  }
}

