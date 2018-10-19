import "aframe";
import "aframe-animation-component";
import {Entity, Scene} from "aframe-react";
import React, {Component} from "react";
import {Provider} from "react-redux";
import queryString from 'query-string';
import * as R from 'ramda';
import PointPlane from "components/atoms/PointPlane";
import PointCloud from "components/molecules/PointCloud";
import HandControls from "components/molecules/HandControls";
import Rotunda from "components/complexes/Rotunda";
import Floor from "components/complexes/Floor";

// Breast cancer, no significant points :(
// import data from "data/100k_breast_cancer.coords.json";

// Height:
import data from "data/90k_GIANT_height_filtered.gene_loc.coords.json";

import cytobands from "data/human_genome_cytoband_edges.json";
import {createChromosomeScale, calculateCoordinates} from "utils";
import configureStore from "./store/configureStore";
import initialState from "./store/initialState";

const queryParams = queryString.parse(window.location.search);

const store = configureStore(R.mergeDeepLeft({
  user: {
    rightHanded: typeof queryParams.lefty === 'undefined'
  },
  room: {
    height: (queryParams['room.height'] && parseInt(queryParams['room.height'], 10)) || initialState.room.height,
    radius: (queryParams['room.radius'] && parseInt(queryParams['room.radius'], 10)) || initialState.room.radius,
  },
  pCutoff: (queryParams.p && parseFloat(queryParams.p, 10)) || initialState.pCutoff,
  pointCount: (queryParams.points && parseInt(queryParams.points, 10)) || initialState.pointCount,
}, initialState));

class App extends Component {
  constructor() {
    super();

    this.state = {
      inVR: false
    };
  }

  componentDidMount() {
    const scene = document.querySelector("a-scene");
    scene.addEventListener("enter-vr", () => {
      this.setState({inVR: true});
    });
    scene.addEventListener("exit-vr", () => {
      this.setState({inVR: false});
    });
  }

  render() {
    const state = store.getState();
    const roomHeight = state.room.height;
    const roomRadius = state.room.radius;

    const chroms = R.pluck("label", state.chromosomes);
    const sizes = R.pluck("size", state.chromosomes);
    const colorScheme = R.pluck("color", state.chromosomes);
    const chromDict = createChromosomeScale(chroms, sizes);

    // Use full dataset
    let downsampledData = data;

    // Choose the subset with the highest p-values
    if (state.pointCount) {
      downsampledData = R.compose(
        R.slice(0, state.pointCount),
        R.sortBy(R.prop("p"))
      )(data);
    }

    let {coordinates, yScaleDomain, radiusScaleInfo} = calculateCoordinates(
      downsampledData,
      chromDict,
      roomRadius,
      roomHeight
    );

    const {sigCoords = [], insigCoords = []} = R.groupBy((coord) => {return coord.p < state.pCutoff ? 'sigCoords' : 'insigCoords'}, coordinates)

    const sceneOpts = {
      style: "position: absolute; height: 100%; width: 100%",
      stats: typeof queryParams.stats !== "undefined"
    };

    return (
      <Provider store={store}>
        <Scene {...sceneOpts}>
          {
            // Camera wrapped in a positional entity because VR headsets apply their own position, which overrides
            // the position attribute on a camera. This allows both monitor and headset position to be similar.
          }
          <Entity position={{y: -roomHeight / 2}}>
            <Entity
              primitive="a-camera"
              id="userCamera"
              look-controls
              raycaster="objects: .data-point"
            >
              {!this.state.inVR && (<Entity
                id="reticle"
                cursor={{fuse: true, fuseTimeout: "500"}}
                geometry={{
                  primitive: "ring",
                  radiusInner: 0.0005,
                  radiusOuter: 0.001
                }}
                position={{x: 0, y: 0, z: -0.1}}
                material={{color: "black", shader: "flat", opacity: 0.4}}
              />)}
            </Entity>
          </Entity>

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

          <HandControls />

          {!this.state.inVR && <div>Loading...</div>}
          {this.state.inVR && <div>Now displaying in VR....</div>}
        </Scene>
      </Provider>
    );
  }
}

export default App;
