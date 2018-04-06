import React from 'react';
import {View, Cylinder, Plane, CylindricalPanel, Text, Image} from 'react-vr';
import R from 'ramda';

export default class Rotunda extends React.Component {
  render() {
    const {
      radius,
      eyeHeight,
      chromDict,
      colorScheme
    } = this.props;

    const colors = colorScheme;

    let cylWidth = 4096; // 4096 is the max allowed
    let cylHeight = 1000; // 1000 is the max allowed

    const drawChromosomePanel = R.curry(function(labeled, seg) {
      let circumference = radius * (2 * Math.PI);
      let slice = seg.scaledEnd - seg.scaledStart;
      let midPoint = (seg.scaledStart + seg.scaledEnd) / 2;

      let textWidth = cylWidth * slice;

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
          {labeled ? <Text
            style={{
              margin: 0,
              width: textWidth,
              fontSize: 30,
              fontWeight: '300',
              textAlign: 'center',
              backgroundColor: colors[seg.index],
              transform: [
                {translate: [(midPoint * cylWidth) - (textWidth / 2), -200, 0]}
              ],
            }}>{R.split("chr", seg.chrom)[1]}</Text>
          : null}
        </View>
      );
    });

    const makePanels = function(labeled) {
      return R.map(drawChromosomePanel(labeled), R.values(chromDict));
    }

    const styleHeight = {opacity: 1, width: cylWidth, height: cylHeight, transform: [{translate: [0, 0, 0]}]};

    const cylPanelStyle = function(index) {
      return {
        position: 'absolute',
        transform: [
          {rotateY: -180},
          {translate: [0, (-eyeHeight * 0.10325) + (radius*0.7 * index), 0]}
        ],
      };
    };
    console.log("radius:", radius);
    const cylPanelLayer = {width: cylWidth, height: cylHeight, density: cylWidth, radius: radius};

    const createPanel = function(index) {
      return (
        <CylindricalPanel key={index} layer={cylPanelLayer} style={cylPanelStyle(index)}>
          <View style={styleHeight}>{makePanels(index === 0)}</View>
        </CylindricalPanel>
      );
    };

    return (
      <View>
        {R.map(createPanel, R.range(-5,20))}
      </View>
    )
  }
}
