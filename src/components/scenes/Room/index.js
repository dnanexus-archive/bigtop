import "aframe";
import "aframe-animation-component";
import {Entity} from "aframe-react";
import React, {Component} from "react";
import {connect} from "react-redux";
import * as R from 'ramda';
import * as actionCreators from "./actions";

import PointPlane from "components/atoms/PointPlane";
import PointCloud from "components/molecules/PointCloud";
import Rotunda from "components/complexes/Rotunda";
import Floor from "components/complexes/Floor";
import cytobands from "data/human_genome_cytoband_edges.json";
import {createChromosomeScale, calculateCoordinates} from "utils";

class Room extends Component {
  componentDidMount() {
    this.props.fetchData(this.props.url)
  }

  render() {
    const {data, room, chromosomes, pCutoff, pointCount} = this.props;
    if (!data)
      return "Loading....";

    const roomHeight = room.height;
    const roomRadius = room.radius;

    const chroms = R.pluck("label", chromosomes);
    const sizes = R.pluck("size", chromosomes);
    const colorScheme = R.pluck("color", chromosomes);
    const chromDict = createChromosomeScale(chroms, sizes);

    // Use full dataset
    let downsampledData = data;

    // Choose the subset with the highest p-values
    if (pointCount) {
      downsampledData = R.compose(
        R.slice(0, pointCount),
        R.sortBy(R.prop("p"))
      )(downsampledData);
    }

    let {coordinates, yScaleDomain, radiusScaleInfo} = calculateCoordinates(
      downsampledData,
      chromDict,
      roomRadius,
      roomHeight
    );

    const {sigCoords = [], insigCoords = []} = R.groupBy((coord) => {return coord.p < pCutoff ? 'sigCoords' : 'insigCoords'}, coordinates)

    return (
      <Entity>
        <PointPlane points={insigCoords} height={roomHeight} radius={roomRadius} />
        <PointCloud
          data={sigCoords}
          height={roomHeight}
          yScaleDomain={yScaleDomain}
          radius={roomRadius}
        />

        <Rotunda
          radius={roomRadius}
          height={roomHeight}
          chromDict={chromDict}
          cytobands={cytobands}
          colorScheme={colorScheme}
          yScaleDomain={yScaleDomain}
          yAxisTitle="-log10(p-value)"
        />

        <Entity light={{ type: "ambient", color: "#ffffff", intensity: 0.9 }} />
        <Entity light={{ type: "point", color: "#ffffff", intensity: 0.4, distance: 50 }} position={`0 ${roomHeight / 2 - roomHeight * 0.1} 0`} />

        <Floor
          radius={roomRadius}
          yPosition={-roomHeight / 2}
          radiusScaleInfo={radiusScaleInfo}
          radiusAxisTitle="Allele frequency"
        />
      </Entity>
    );
  }
}

const mapStateToProps = (state) => ({
  pCutoff: state.pCutoff,
  pointCount: state.pointCount,
  room: state.room,
  chromosomes: state.chromosomes,
  data: state.data
});

export default connect(mapStateToProps, actionCreators)(Room);