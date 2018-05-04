import React from 'react';
import {View, Cylinder, Plane, CylindricalPanel, Text, Image} from 'react-vr';
import {connect} from 'react-redux';
import R from 'ramda';
import {scaleLinear} from 'd3-scale';
import {axisLeft} from 'd3-axis';

class ChromosomeRing extends React.Component {
  render() {
    const {
      labeled,
      chromList,
      yScaleDomain,
      radius,
      colors,
      cylWidth,
      cylHeight
    } = this.props;

    const styleHeight = {opacity: 1, width: cylWidth, height: cylHeight, transform: [{translate: [0, 0, 0]}]};


    /////////////////////// Axis ///////////////////////
    let yScale = scaleLinear()
      .domain(yScaleDomain)
      .range([0, cylHeight]);

    let yAxis = axisLeft(yScale).ticks(10);
    let tickDomainValues = yAxis.scale().ticks();
    let tickRangeValues = R.map(d => yScale(d), tickDomainValues);

    /////////////////////// 1 chromosome ///////////////////////
    const drawChromosomePanel = R.curry(function(labeled, seg) {
      let circumference = radius * (2 * Math.PI);
      let slice = seg.scaledEnd - seg.scaledStart;
      let midPoint = (seg.scaledStart + seg.scaledEnd) / 2;

      let textWidth = (cylWidth * slice) * 0.9;

      let axisPlaneWidth = 5;

      return (
        <View key={seg.chrom} style={{position: 'absolute'}}>
          <Plane
            dimWidth={cylWidth * slice}
            dimHeight={cylHeight}
            style={{
              transform: [
                {translate: [midPoint * cylWidth, 0, 0]},
              ],
              color: colors[seg.index],
              opacity: 1
            }}
          />
          {labeled ?
            <Text style={{
              margin: 0,
              width: textWidth,
              fontSize: 30,
              fontWeight: '300',
              textAlign: 'center',
              backgroundColor: colors[seg.index],
              transform: [
                {translate: [(midPoint * cylWidth) - (textWidth / 2), -200, 0]}
              ],
            }}>{R.split("chr", seg.chrom)[1]}</Text> : null
          }
          {labeled ?
            // Draw y-axis line
            <View>
              <Plane
                dimWidth={axisPlaneWidth}
                dimHeight={cylHeight}
                style={{
                  transform: [
                    {translate: [seg.scaledEnd * cylWidth, 0, 0]},
                  ],
                  color: "black",
                  opacity: 1
                }}
              />
              {// TO DO: Draw tick marks here
              }
            </View> : null
          }
        </View>
      );
    });

    return (
      <View style={styleHeight}>
        {R.map(drawChromosomePanel(labeled), chromList)}
      </View>
    );
  }
}

export default ChromosomeRing;
