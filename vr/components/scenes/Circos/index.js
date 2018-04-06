import React from 'react';
import {View, Cylinder, Plane} from 'react-vr';
import {createChromosomeScale} from '../../../utils';
import Floor from '../../molecules/Floor';
import Rotunda from '../../molecules/Rotunda';
import PointCloud from '../../molecules/PointCloud';
import dataPoints from '../../../../data/1k_GIANT_height.gene_loc.coords.json';

export default class Circos extends React.Component {
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
      eyeHeight
    } = this.props;

    const {
      chromDict
    } = this.state;

    const colorScheme = ['#E41A1C', '#A73C52', '#6B5F88', '#3780B3', '#3F918C', '#47A266','#53A651', '#6D8470', '#87638F', '#A5548D', '#C96555', '#ED761C','#FF9508', '#FFC11A', '#FFEE2C', '#EBDA30', '#CC9F2C', '#AD6428','#BB614F', '#D77083', '#F37FB8', '#DA88B3', '#B990A6', '#999999'];

    return (
      <View>
        <Floor chromDict={chromDict} radius={radius + 200} eyeHeight={eyeHeight}></Floor>
        <Rotunda chromDict={chromDict} radius={radius} eyeHeight={eyeHeight} colorScheme={colorScheme} />
        <PointCloud points={dataPoints} scaleFactor={[1, 50, 1]} translationFactor={[0, -eyeHeight, 0]}></PointCloud>
      </View>
    )
  }
}
