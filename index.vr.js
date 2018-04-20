import React from 'react';
import {AppRegistry, asset} from 'react-vr';
import {Provider} from 'react-redux';
import configureStore from './vr/store/configureStore';
import initialState from './vr/initialState';
import World from './vr/components/worlds/Manhattan';
import Circos from './vr/components/scenes/Circos';
import ThresholdDisc from './vr/components/atoms/ThresholdDisc';

store = configureStore(initialState);

export default class ManhattanProject extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <World>
          <Circos />
          <ThresholdDisc />
        </World>
      </Provider>
    );
  }
};

AppRegistry.registerComponent('manhattan_project', () => ManhattanProject);
