import React from 'react';
import {AppRegistry, asset} from 'react-vr';
import World from './vr/components/worlds/Manhattan';
import Circos from './vr/components/scenes/Circos';

export default class ManhattanProject extends React.Component {
  render() {
    return (
      <World>
        <Circos radius={1000} eyeHeight={150} />
      </World>
    );
  }
};

AppRegistry.registerComponent('manhattan_project', () => ManhattanProject);
