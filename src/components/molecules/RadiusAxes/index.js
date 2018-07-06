import 'aframe';
import 'aframe-particle-system-component';
import {Entity} from 'aframe-react';
import React, {Component} from 'react';
import * as R from 'ramda';
import CylindricalPanel from 'components/atoms/CylindricalPanel';
import TickSet from 'components/atoms/TickSet';
import {scaleLinear} from 'd3-scale';

class YAxes extends Component {
  render() {
    const {
      yPosition,
      radiusScaleInfo
    } = this.props;

    const ringWidth = 0.01;

    let rScale = scaleLinear()
      .domain(radiusScaleInfo.domain)
      .range(radiusScaleInfo.range);

    let tickValues = rScale.ticks();
    let ticks = R.map(d => {return {value: d, position: rScale(d)}}, tickValues);

    return (
      <Entity>
        {
          R.map(function(d) {
            return (<Entity
              key={d.value}
              geometry={{primitive: 'ring', radiusInner: d.position, radiusOuter: d.position + ringWidth}}
              position={{x:0, y: yPosition, z: 0}}
              rotation={{x: 270, y: 0, z: 180}}
              material={{color: 'black'}}
            />)
          }, ticks)
        }
      </Entity>
    );
  }
}

export default YAxes;
