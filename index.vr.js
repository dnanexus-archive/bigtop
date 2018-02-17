import React from 'react';
import {AppRegistry} from 'react-vr';
import World from './vr/components/worlds/Manhattan';
import ChromoPlatform from './vr/components/scenes/ChromoPlatform';
import PointCloud from './vr/components/molecules/PointCloud';
import data from './vr/data';

export default class ManhattanProject extends React.Component {
  render() {
    return (
      <World>
        <ChromoPlatform radius={1500}></ChromoPlatform>
        <PointCloud></PointCloud>
      </World>
    );
  }
};

AppRegistry.registerComponent('manhattan_project', () => ManhattanProject);
