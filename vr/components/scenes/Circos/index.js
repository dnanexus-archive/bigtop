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
  constructor(props) {
    super(props);

    const chroms = ['chr1', 'chr2', 'chr3', 'chr4', 'chr5', 'chr6', 'chr7', 'chr8', 'chr9', 'chr10', 'chr11', 'chr12', 'chr13', 'chr14', 'chr15', 'chr16', 'chr17', 'chr18', 'chr19', 'chr20', 'chr21', 'chr22', 'chrX', 'chrY'];
    const sizes = [248956422, 242193529, 198295559, 190214555, 181538259, 170805979, 159345973, 145138636, 138394717, 133797422, 135086622, 133275309, 114364328, 107043718, 101991189, 90338345, 83257441, 80373285, 58617616, 64444167, 46709983, 50818468, 156040895, 57227415];
    const chromDict = createChromosomeScale(chroms, sizes);

    this.state = {
      chromDict: chromDict
    }
  }

  render() {
    const {
      radius,
      eyeHeight,
      threshold
    } = this.props;

    const {
      chromDict
    } = this.state;


    // OPTIONS:
    const yRange = [0, 5];
    const innerRadius = radius * 0.1;
    const yTransform = y => -1 * Math.log10(y);

    const keys = {r: "frequency", y: "p", chrom: "chr", pos: "location"};

    // rScale determines how far away from center a point is
    let rScale = scaleLinear()
      .domain(extent(data, d => d[keys.r]))
      .range([innerRadius, radius]);

    let yScale = scaleLinear()
      .domain([0, max(data, d => yTransform(d[keys.y]))])
      .range(yRange);

    let thetaScale = scaleLinear()
      .domain([0, max(R.values(chromDict), d => d.end)])
      .range([0, 2 * Math.PI])

    const calculateCoordinates = function(d) {
      let r = rScale(d[keys.r]);
      let y = yScale(yTransform(d[keys.y]));
      let c = chromDict[d[keys.chrom]];

      let chromPos = c.start + d[keys.pos];
      let theta = thetaScale(chromPos);
      let {x, z} = polarToCartesian(r, theta);
      // return {...d, x: x, y: y, z: z};
      return {...d, coords: [x, y, z]};
    }

    let coordinates = R.map(calculateCoordinates, data);

    const colorScheme = ['#E41A1C', '#A73C52', '#6B5F88', '#3780B3', '#3F918C', '#47A266','#53A651', '#6D8470', '#87638F', '#A5548D', '#C96555', '#ED761C','#FF9508', '#FFC11A', '#FFEE2C', '#EBDA30', '#CC9F2C', '#AD6428','#BB614F', '#D77083', '#F37FB8', '#DA88B3', '#B990A6', '#999999'];

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
    threshold: state.user.pCutoff
  }
}

export default connect(mapStateToProps)(Circos);
