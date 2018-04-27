import React from 'react';
import R from 'ramda';
import {View, Cylinder, Plane} from 'react-vr';
import {connect} from 'react-redux';
import {createChromosomeScale} from '../../../utils';
import Floor from '../../molecules/Floor';
import Rotunda from '../../molecules/Rotunda';
import PointCloud from '../../molecules/PointCloud';
import {scaleLinear} from 'd3-scale';
import {min, max, extent} from 'd3-array';
import data from '../../../../data/90k_GIANT_height_filtered.gene_loc.coords.json';


const polarToCartesian = function(r, theta) {
  return {
    x: r * Math.cos(theta - (Math.PI / 2)),
    z: r * Math.sin(theta - (Math.PI / 2))
  };
}

class Circos extends React.Component {
  render() {
    const {
      radius,
      eyeHeight,
      threshold,
      chromDict,
      colorScheme
    } = this.props;

    // OPTIONS:
    const yRange = [0, 5];
    const optionalCeilingP = 20;
    const innerRadius = radius * 0.1;
    const yTransform = y => -1 * Math.log10(y);

    const keys = {r: "frequency", y: "p", chrom: "chr", pos: "location"};

    // rScale determines how far away from center a point is
    let rScale = scaleLinear()
      .domain(extent(data, d => d[keys.r]))
      .range([innerRadius, radius]);

    const dataMaxP = max(data, d => yTransform(d[keys.y]));
    const maxP = optionalCeilingP || dataMaxP;

    console.log("max -log10(p) from data:", dataMaxP, "chosen value:", maxP);
    let yScale = scaleLinear()
      .domain([0, maxP])
      .range(yRange);

    let thetaScale = scaleLinear()
      .domain([0, max(R.values(chromDict), d => d.end)])
      .range([0, 2 * Math.PI])

    const calculateCoordinates = function(d) {
      let r = rScale(d[keys.r]);
      // let transformedY = yTransform(d[keys.y]); // use this if we ever need the transformed p-values
      let y = yScale(yTransform(d[keys.y]));
      let c = chromDict[d[keys.chrom]];

      let chromPos = c.start + d[keys.pos];
      let theta = thetaScale(chromPos);
      let {x, z} = polarToCartesian(r, theta);
      return {...d, coords: [x, y, z]};
    }

    let coordinates = R.map(calculateCoordinates, data);

    return (
      <View>
        <Floor chromDict={chromDict} radius={radius + 2} eyeHeight={eyeHeight}></Floor>
        <Rotunda chromDict={chromDict} radius={radius} eyeHeight={eyeHeight} colorScheme={colorScheme} />
        <PointCloud points={coordinates} scaleFactor={[1, 50, 1]} translationFactor={[0, -eyeHeight, 0]} threshold={threshold}/>
      </View>
    )
  }
}

mapStateToProps = (state) => {
  return {
    radius: state.world.radius,
    eyeHeight: state.world.eyeHeight,
    threshold: state.user.pCutoff,
    chromDict: state.reference.chromDict,
    colorScheme: state.reference.colorScheme
  }
}

export default connect(mapStateToProps)(Circos);
