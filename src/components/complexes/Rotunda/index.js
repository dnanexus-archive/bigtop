import 'aframe';
import 'aframe-particle-system-component';
import {Entity} from 'aframe-react';
import React, {Component} from 'react';
import * as R from 'ramda';
import ChromosomeWalls from 'components/molecules/ChromosomeWalls';
import ChromosomeLabels from 'components/molecules/ChromosomeLabels';
import ChromosomeCytobands from 'components/molecules/ChromosomeCytobands';
import YAxes from 'components/molecules/YAxes';
import {polarToCartesian} from 'utils';


class Rotunda extends Component {
  render() {
    const {
      radius,
      height,
      chromDict,
      cytobands,
      colorScheme,
      yScaleDomain,
      yAxisTitle
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
          radius={radius*0.999}
          yPosition={0}
        />
        <ChromosomeCytobands
          cytobands={cytobands}
          chromDict={chromDict}
          radius={radius*0.998}
          height={height/10}
          yPosition={1}
        />
        <YAxes
          chromList={chromList}
          yScaleDomain={yScaleDomain}
          radius={radius*0.997}
          height={height}
          yPosition={0}
        />
        {/* Y axis: e.g. "-log10(p-value)" */}
        <Entity
          text={{value: yAxisTitle, align: "center", width: 10, color: "black"}}
          // geometry={{primitive: "plane", height: "auto", width: 3.5}}
          // material="color: black"
          position={{y: -0.3 * height, ...polarToCartesian(radius*0.997, -0.005 * (2 * Math.PI))}}
          rotation={{z: 90}}
        />
      </Entity>
    );
  }
}

export default Rotunda;
