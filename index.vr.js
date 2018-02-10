import React from 'react';
import {AppRegistry} from 'react-vr';
import World from './vr/components/worlds/manhattan';
import Pedestal from './vr/components/scenes/pedestal';

export default class ManhattanProject extends React.Component {
  render() {
    return (
      <World>
        <Pedestal></Pedestal>
      </World>
    );
  }
};

AppRegistry.registerComponent('manhattan_project', () => ManhattanProject);
