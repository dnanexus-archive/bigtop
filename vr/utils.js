import R from 'ramda';

export const createChromosomeScale = function(chroms, sizes) {
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

export const scaleByChromPos = function(dict, chrom, pos) {
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