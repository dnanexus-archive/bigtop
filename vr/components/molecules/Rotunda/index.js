import React from 'react';
import {View, Cylinder, Plane, CylindricalPanel, Text, Image} from 'react-vr';
import R from 'ramda';

export default class Rotunda extends React.Component {
  render() {
    const {
      radius,
      eyeHeight,
      chromDict
    } = this.props;

    const colorSchemes = [['#E41A1C', '#A73C52', '#6B5F88', '#3780B3', '#3F918C', '#47A266','#53A651', '#6D8470', '#87638F', '#A5548D', '#C96555', '#ED761C','#FF9508', '#FFC11A', '#FFEE2C', '#EBDA30', '#CC9F2C', '#AD6428','#BB614F', '#D77083', '#F37FB8', '#DA88B3', '#B990A6', '#999999'],["#ffff00","#ad0000","#bdadc6", "#00ffff", "#e75200","#de1052","#ffa5a5","#7b7b00","#7bffff","#008c00","#00adff","#ff00ff","#ff0000","#ff527b","#84d6a5","#e76b52","#8400ff","#6b4242","#52ff52","#0029ff","#ffcc66","#ff94ff","#004200","gray","black"],["#ff9896", "#c5b0d5", "#8c564b", "#e377c2", "#bcbd22", "#9edae5", "#c7c7c7", "#d62728", "#ffbb78", "#98df8a", "#ff7f0e", "#f7b6d2", "#c49c94", "#dbdb8d", "#aec7e8", "#17becf", "#2ca02c", "#7f7f7f", "#1f77b4", "#9467bd"]];
    const colors = colorSchemes[0];

    let cylWidth = 4096;
    let cylHeight = 1000;

    let panels = R.map(function(seg) {
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
        <Text
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
        </View>);
    }, R.values(chromDict));

    return (
      <View>
        <CylindricalPanel layer={{width: cylWidth, height: cylHeight, density: cylWidth}} style={{
          position: 'absolute',
          transform: [
            {rotateY: -180}
          ],
        }}>
          <View
            style={{
              opacity: 1,
              width: cylWidth,
              height: cylHeight,
              transform: [{translate: [0, -eyeHeight, 0]}]
            }}
          >
            {panels}
          </View>
        </CylindricalPanel>
      </View>
    )
  }
}

