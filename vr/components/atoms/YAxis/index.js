import React, {Component} from 'react';
import R from 'ramda';
import {View, Plane, Text} from 'react-vr';
import {scaleLinear} from 'd3-scale';
import {axisLeft} from 'd3-axis';
import {gather} from '../../../utils';

class YAxis extends Component {
  render() {
    const {
      cylHeight,
      cylWidth,
      seg,
      yScaleDomain
    } = this.props;
    let xPos = (seg.scaledStart * cylWidth) + (axisPlaneWidth / 2);

    const axisPlaneWidth = 5;
    const tickWidth = 10;
    const tickHeight = cylHeight / 100;
    const tickTextWidth = 30;
    const tickTextHeight = 100;

    let yScale = scaleLinear()
      .domain(yScaleDomain)
      .range([0, cylHeight]);

    let yAxis = axisLeft(yScale).ticks(10);
    let tickDomainValues = yAxis.scale().ticks();
    let tickRangeValues = R.map(d => yScale(d), tickDomainValues);

    let tickData = gather({domain: tickDomainValues, range: tickRangeValues});

    let drawTick = function(d) {
      let yPos = d.range - (cylHeight / 2);
      return (
        <View key={d.domain} style={{transform: [{translate: [seg.scaledStart * cylWidth, yPos, 0]}]}}>
          <Plane
            dimWidth={tickWidth}
            dimHeight={tickHeight}
            style={{
              color: "red",
              opacity: 1
            }}
          />
          <Text style={{
            margin: 0,
            width: tickTextWidth,
            fontSize: 10,
            textAlign: 'center',
            transform: [{translate: [-(tickTextWidth / 2), tickHeight / 2, 0]}],
            backgroundColor: "black"
          }}>
            {d.domain}
          </Text>
        </View>);
    }

    return (<View>
      <Plane
        dimWidth={axisPlaneWidth}
        dimHeight={cylHeight}
        style={{
          transform: [
            {translate: [xPos, 0, 0]},
          ],
          color: "black",
          opacity: 1
        }}
      />
      {// TO DO: Draw tick marks here
        R.map(drawTick, tickData)
      }
    </View>);
  }
}

export default YAxis;
