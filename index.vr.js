import React from 'react';
import {AppRegistry, asset} from 'react-vr';
import World from './vr/components/worlds/Manhattan';
import ChromoPlatform from './vr/components/scenes/ChromoPlatform';
import Circos from './vr/components/scenes/Circos';
import PointCloud from './vr/components/molecules/PointCloud';
import dataPoints from './data/1k_GIANT_height.located.coords.json';

const EYE_HEIGHT = 150;
const RADIUS = 1000;

export default class ManhattanProject extends React.Component {
  render() {
    return (
      <World>
        <ChromoPlatform radius={RADIUS + 200} eyeHeight={EYE_HEIGHT}></ChromoPlatform>
        <PointCloud points={dataPoints} scaleFactor={[1, 5, 1]} translationFactor={[0, -EYE_HEIGHT, 0]}></PointCloud>
        <Circos radius={RADIUS} eyeHeight={EYE_HEIGHT} />
      </World>
    );
  }
};

AppRegistry.registerComponent('manhattan_project', () => ManhattanProject);
