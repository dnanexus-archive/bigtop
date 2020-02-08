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
    const cartesian = polarToCartesian(radius * 0.997, -0.005 * (2 * Math.PI));

    return (
      <a-entity>
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
        {!R.isEmpty(cytobands) && <ChromosomeCytobands
          cytobands={cytobands}
          chromDict={chromDict}
          radius={radius*0.998}
          height={height*0.06}
          yPosition={-1}
        />}
        <YAxes
          chromList={chromList}
          yScaleDomain={yScaleDomain}
          radius={radius*0.997}
          height={height}
          yPosition={0}
        />
        {/* Y axis: e.g. "-log10(p-value)" */}
        <a-text
          font="fonts/Roboto-msdf.json"
          value={yAxisTitle}
          align="center"
          width="10"
          color="black"
          position={`${cartesian.x} ${-0.3 * height} ${cartesian.z}`}
          rotation="0 0 90"
        />
      </a-entity>
    );
  }
}

export default Rotunda;
