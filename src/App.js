import "aframe";
import "aframe-particle-system-component";
import "aframe-animation-component";
import { Entity, Scene } from "aframe-react";
import React, { Component } from "react";
import { Provider } from "react-redux";
import PointCloud from "components/molecules/PointCloud";
import Rotunda from "components/complexes/Rotunda";
import Floor from "components/complexes/Floor";
import data from "data/90k_GIANT_height_filtered.gene_loc.coords.json";
import cytobands from "data/human_genome_cytoband_edges.json";
import { createChromosomeScale, calculateCoordinates } from "utils";
import * as R from 'ramda';
import configureStore from "./store/configureStore";
import initialState from "./store/initialState";

const store = configureStore(initialState);

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
      this.setState({ inVR: true });
    });
    scene.addEventListener("exit-vr", () => {
      this.setState({ inVR: false });
    });
  }

  render() {
    const roomRadius = 10; // meters
    const roomHeight = 10; // meters

    const chroms = ["chr1", "chr2", "chr3", "chr4", "chr5", "chr6", "chr7", "chr8", "chr9", "chr10", "chr11", "chr12", "chr13", "chr14", "chr15", "chr16", "chr17", "chr18", "chr19", "chr20", "chr21", "chr22", "chrX", "chrY"];
    const sizes = [248956422, 242193529, 198295559, 190214555, 181538259, 170805979, 159345973, 145138636, 138394717, 133797422, 135086622, 133275309, 114364328, 107043718, 101991189, 90338345, 83257441, 80373285, 58617616, 64444167, 46709983, 50818468, 156040895, 57227415];
    const chromDict = createChromosomeScale(chroms, sizes);
    const colorScheme = ["#E41A1C", "#A73C52", "#6B5F88", "#3780B3", "#3F918C", "#47A266", "#53A651", "#6D8470", "#87638F", "#A5548D", "#C96555", "#ED761C", "#FF9508", "#FFC11A", "#FFEE2C", "#EBDA30", "#CC9F2C", "#AD6428", "#BB614F", "#D77083", "#F37FB8", "#DA88B3", "#B990A6", "#999999"];

    // //  Use full dataset
    // let downsampledData = data; 

    // Choose the subset with the highest p-values
    let downsampledData = R.compose(
      R.slice(0, 5000),
      R.sortBy(R.prop("p"))
    )(data);

    let { coordinates, yScaleDomain, radiusScaleInfo } = calculateCoordinates(
      downsampledData,
      chromDict,
      roomRadius,
      roomHeight
    );

    const sceneOpts = {
      style: "position: absolute; height: 100%; width: 100%"
    };

    let reticle;
    if (this.state.inVR) {
      reticle = (
        <Entity
          cursor
          geometry={{ primitive: "plane", height: 0.00075, width: 0.015 }}
          position={{ x: 0, y: 0, z: -0.4 }}
          material={{ color: "black", shader: "flat" }}
        />
      );
    } else {
      reticle = (
        <Entity
          cursor={{fuse: true, fuseTimeout: "750"}}
          geometry={{
            primitive: "ring",
            radiusInner: 0.0005,
            radiusOuter: 0.001
          }}
          position={{ x: 0, y: 0, z: -0.1 }}
          material={{ color: "black", shader: "flat", opacity: 0.4 }}
        />
      );
    }

    return (
      <Provider store={store}>
        <Scene {...sceneOpts}>
          {
            // Camera wrapped in a positional entity because VR headsets apply their own position, which overrides
            // the position attribute on a camera. This allows both monitor and headset position to be similar.
          }
          <Entity position="0 -5 0">
            <Entity
              primitive="a-camera"
              id="userCamera"
              look-controls
              raycaster="objects: .data-point"
            >
              {reticle}
            </Entity>
          </Entity>

          <PointCloud
            data={coordinates}
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

          <Entity light={{ type: "point" }} position="0 -2 0" />
          <Entity
            light={{ type: "ambient", color: "#ffffff", intensity: 0.2 }}
          />
          <Floor
            radius={roomRadius}
            yPosition={-roomHeight / 2}
            radiusScaleInfo={radiusScaleInfo}
            radiusAxisTitle="Allele frequency"
          />

          {!this.state.inVR && <div>Loading...</div>}
          {this.state.inVR && <div>Now displaying in VR....</div>}
        </Scene>
      </Provider>
    );
  }
}

export default App;
