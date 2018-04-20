import React from 'react';
import {AppRegistry, asset} from 'react-vr';
import {Provider} from 'react-redux';
import configureStore from './vr/store/configureStore';
import World from './vr/components/worlds/Manhattan';
import Circos from './vr/components/scenes/Circos';
import ThresholdDisc from './vr/components/atoms/ThresholdDisc';

store = configureStore();

export default class ManhattanProject extends React.Component {
  render() {
    const EYE_HEIGHT = 150;
    const RADIUS = 1000;
    let threshold = 1e-6;

    return (
      <Provider store={store}>
        <World>
          <Circos radius={RADIUS} eyeHeight={EYE_HEIGHT} threshold={threshold} />
          <ThresholdDisc threshold={threshold} radius={RADIUS} eyeHeight={EYE_HEIGHT} />
        </World>
      </Provider>
    );
  }
};

AppRegistry.registerComponent('manhattan_project', () => ManhattanProject);
