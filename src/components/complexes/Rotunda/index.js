import 'aframe';
import 'aframe-particle-system-component';
import {Entity} from 'aframe-react';
import React, {Component} from 'react';
import * as R from 'ramda';
import ChromosomeWalls from 'components/molecules/ChromosomeWalls';
import ChromosomeLabels from 'components/molecules/ChromosomeLabels';
import ChromosomeCytobands from 'components/molecules/ChromosomeCytobands';

class Rotunda extends Component {
  render() {
    const {
      radius,
      height,
      chromDict,
      cytobands,
      colorScheme
    } = this.props;

    const chromList = R.values(chromDict);

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
          radius={radius*0.9}
          yPosition={0}
        />
        <ChromosomeCytobands
          cytobands={cytobands}
          chromDict={chromDict}
          radius={radius*0.9}
          height={height/10}
          yPosition={1}
        />
      </Entity>
    );
  }
}

export default Rotunda;
