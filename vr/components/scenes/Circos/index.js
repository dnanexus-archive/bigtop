import React from 'react';
import {View, Cylinder, Plane} from 'react-vr';
import R from 'ramda';

const createChromosomeScale = function(chroms, sizes) {
  let index = -1;
  let chromosomeLengths = R.zipWith(function(a, b) {
    index++;
    return {chrom: a, size: b, index: index};
  })(chroms, sizes);

  let cumSum = 0;
  chromosomeLengths = R.map(function(d) {
    d.start = cumSum;
    cumSum += d.size;
    d.end = cumSum;
    return d;
  }, chromosomeLengths);

  chromosomeLengths = R.map(function(d) {
    d.scaledStart = d.start / cumSum;
    d.scaledEnd = d.end / cumSum;
    return d;
  }, chromosomeLengths);

  return R.zipObj(R.pluck("chrom", chromosomeLengths), chromosomeLengths);
};

const scaleByChromPos = function(dict, chrom, pos) {
  if (dict && dict[chrom] && dict[chrom].chrom === chrom) {
    if (pos >= 0 && pos <= dict[chrom].size) {
      let seg = dict[chrom];
      return ((pos / seg.size) * (seg.scaledEnd - seg.scaledStart)) + seg.scaledStart;
    } else {
      console.error(`invalid pos = ${pos}, should be between 0 and ${dict[chrom].size}`);
    }
  } else {
    console.error(`no chrom ${chrom} found in dict:`, dict);
  }
}

export default class Circos extends React.Component {
  constructor(props) {
    super(props);

    const chroms = ['chr1', 'chr2', 'chr3', 'chr4', 'chr5', 'chr6', 'chr7', 'chr8', 'chr9', 'chr10', 'chr11', 'chr12', 'chr13', 'chr14', 'chr15', 'chr16', 'chr17', 'chr18', 'chr19', 'chr20', 'chr21', 'chr22', 'chrX', 'chrY'];
    const sizes = [248956422, 242193529, 198295559, 190214555, 181538259, 170805979, 159345973, 145138636, 138394717, 133797422, 135086622, 133275309, 114364328, 107043718, 101991189, 90338345, 83257441, 80373285, 58617616, 64444167, 46709983, 50818468, 156040895, 57227415];
    // const chroms = ["1", "2", "3", "4"];
    // const sizes = [200, 200, 200, 200];

    const chromDict = createChromosomeScale(chroms, sizes);
    // console.log("chromDict:", chromDict);
    // console.log(scaleByChromPos(chromDict, "1", 100));

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

    const colors = ['#E41A1C', '#A73C52', '#6B5F88', '#3780B3', '#3F918C', '#47A266','#53A651', '#6D8470', '#87638F', '#A5548D', '#C96555', '#ED761C','#FF9508', '#FFC11A', '#FFEE2C', '#EBDA30', '#CC9F2C', '#AD6428','#BB614F', '#D77083', '#F37FB8', '#DA88B3', '#B990A6', '#999999'];

    let walls = R.map(function(seg) {
      let circumference = radius * (2 * Math.PI);
      let slice = seg.scaledEnd - seg.scaledStart;
      let midPoint = (seg.scaledStart + seg.scaledEnd) / 2;
      let theta = midPoint * (2 * Math.PI);
      let a = Math.round(radius * Math.cos(theta));
      let o = Math.round(radius * Math.sin(theta));
      console.log(seg.index, colors[seg.index]);

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
