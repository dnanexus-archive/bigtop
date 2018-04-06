import React from 'react';
import {AppRegistry, asset} from 'react-vr';
import World from './vr/components/worlds/Manhattan';
import Circos from './vr/components/scenes/Circos';
import ThresholdDisc from './vr/components/atoms/ThresholdDisc';

export default class ManhattanProject extends React.Component {
  render() {
    const EYE_HEIGHT = 150;
    const RADIUS = 1000;
    let threshold = 1e-6;

    return (
      <World>
        <Circos radius={RADIUS} eyeHeight={EYE_HEIGHT} threshold={threshold} />
        <ThresholdDisc threshold={threshold} radius={RADIUS} eyeHeight={EYE_HEIGHT} />
      </World>
    );
  }
};

AppRegistry.registerComponent('manhattan_project', () => ManhattanProject);
