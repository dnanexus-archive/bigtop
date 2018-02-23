import React from 'react';
import {AppRegistry, asset} from 'react-vr';
import World from './vr/components/worlds/Manhattan';
import ChromoPlatform from './vr/components/scenes/ChromoPlatform';
import PointCloud from './vr/components/molecules/PointCloud';
import dataPoints from './data/GIANT_random250.located.coords.json';

export default class ManhattanProject extends React.Component {
  render() {
    return (
      <World>
        <ChromoPlatform radius={1500}></ChromoPlatform>
        <PointCloud points={dataPoints}></PointCloud>
      </World>
    );
  }
};

AppRegistry.registerComponent('manhattan_project', () => ManhattanProject);
