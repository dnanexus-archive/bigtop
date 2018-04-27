import React from 'react';
import {View, Cylinder, Plane, CylindricalPanel, Text, Image} from 'react-vr';
import {connect} from 'react-redux';
import R from 'ramda';
import {scaleLinear} from 'd3-scale';
import {axisLeft} from 'd3-axis';

class Rotunda extends React.Component {
  render() {
    const {
      radius,
      eyeHeight,
      chromDict,
      colorScheme,
      yScaleDomain
    } = this.props;

    const colors = colorScheme;

    let cylWidth = 4096; // 4096 is the max allowed
    let cylHeight = 1000; // 1000 is the max allowed


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

    /////////////////////// Putting chromosomes together ///////////////////////
    const makePanels = function(labeled) {
      return R.map(drawChromosomePanel(labeled), R.values(chromDict));
    };

    const styleHeight = {opacity: 1, width: cylWidth, height: cylHeight, transform: [{translate: [0, 0, 0]}]};

    const containerStyle = {
      transform: [
        {rotateY: -180},
        {translate: [0, -eyeHeight + 0.1, 0]}
      ],
    }

    const cylPanelStyle = function(index) {
      return {
        position: 'absolute',
        transform: [
          {rotateY: -180},
          {translate: [0, (radius*0.7 * index), 0]}
        ],
      };
    };
 
    const cylPanelLayer = {width: cylWidth, height: cylHeight, density: cylWidth, radius: radius};

    const createPanel = function(index) {
      return (
        <CylindricalPanel key={index} layer={cylPanelLayer} style={cylPanelStyle(index)}>
          <View style={styleHeight}>
            {makePanels(index === 0)}
          </View>
        </CylindricalPanel>
      );
    };

    return (
      <View style={containerStyle}>
        {R.map(createPanel, R.range(-5, 20))}
      </View>
    )
  }
}

mapStateToProps = (state) => {
  return {
    radius: state.world.radius,
    eyeHeight: state.world.eyeHeight,
    chromDict: state.reference.chromDict,
    colorScheme: state.reference.colorScheme
  }
}

export default connect(mapStateToProps)(Rotunda);