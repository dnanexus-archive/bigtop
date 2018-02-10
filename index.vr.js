import React from 'react';
import {AppRegistry} from 'react-vr';
import World from './vr/components/worlds/manhattan';

export default class ManhattanProject extends React.Component {
  render() {
    return <World />;
  }
};

AppRegistry.registerComponent('manhattan_project', () => ManhattanProject);
