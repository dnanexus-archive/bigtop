import 'aframe';
import 'aframe-particle-system-component';
import {Entity} from 'aframe-react';
import React, {Component} from 'react';
import * as R from 'ramda';
import ChromosomeWalls from 'components/molecules/ChromosomeWalls';
import ChromosomeLabels from 'components/molecules/ChromosomeLabels';

class Rotunda extends Component {
  render() {
    const {
      radius,
      height,
      chromList,
      colorScheme
    } = this.props;

    return (
      <Entity>
        <ChromosomeWalls
          radius={radius}
          height={height}
          chromList={chromList}
          colorScheme={colorScheme}
        />
        <ChromosomeLabels
          chromList={chromList}
          radius={radius}
          yPosition={height / 2}
        />
      </Entity>
    );
  }
}

export default Rotunda;
