import React from 'react';
import {View} from 'react-vr';
import {map} from 'ramda';
import Point from '../../atoms/Point';

export default class PointCloud extends React.Component {
  render() {
    let points = map((point) =>
      <Point cartesianCoords={point.coords} key={point.id} />
    , this.props.points);

    return (
      <View>
        {points}
      </View>
    )
  }
}
