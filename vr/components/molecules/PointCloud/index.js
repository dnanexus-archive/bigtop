import React from 'react';
import {View} from 'react-vr';
import Point from '../../atoms/Point';

const generateRandomCoordinate = () => Math.random() * 500

export default class PointCloud extends React.Component {
  render() {
    let points = [];

    key = 0;
    for (let i = 0; i < 1000; i++) {
      points.push(<Point cartesianCoords={[generateRandomCoordinate() - 250, generateRandomCoordinate(), generateRandomCoordinate() - 250]} key={key++}></Point>)
    }

    return (
      <View>
        {points}
      </View>
    )
  }
}
