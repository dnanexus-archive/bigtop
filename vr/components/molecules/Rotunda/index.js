import React from 'react';
import {View, Cylinder, Plane} from 'react-vr';
import R from 'ramda';

export default class Rotunda extends React.Component {
  render() {
    const {
      radius,
      eyeHeight,
      chromDict
    } = this.props;

    const colors = ['#E41A1C', '#A73C52', '#6B5F88', '#3780B3', '#3F918C', '#47A266','#53A651', '#6D8470', '#87638F', '#A5548D', '#C96555', '#ED761C','#FF9508', '#FFC11A', '#FFEE2C', '#EBDA30', '#CC9F2C', '#AD6428','#BB614F', '#D77083', '#F37FB8', '#DA88B3', '#B990A6', '#999999'];

    let walls = R.map(function(seg) {
      let circumference = radius * (2 * Math.PI);
      let slice = seg.scaledEnd - seg.scaledStart;
      let midPoint = (seg.scaledStart + seg.scaledEnd) / 2;
      let theta = midPoint * (2 * Math.PI);
      let a = Math.round(radius * Math.cos(theta));
      let o = Math.round(radius * Math.sin(theta));

      return (<Plane
          key={seg.chrom}
          dimWidth={circumference * slice}
          dimHeight={300}
          lit={true}
          style={{
            transform: [
              {translate: [o, 0, -a]},
              {rotateY: -theta * (180 / Math.PI)}
            ],
            color: colors[seg.index],
            opacity: 1
          }}
        >
        </Plane>);
    }, R.values(chromDict));

    return (
      <View>
        {walls}
      </View>
    )
  }
}
