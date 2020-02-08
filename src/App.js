import React, {Component} from "react";
import {Provider} from "react-redux";
import queryString from 'query-string';
import * as R from 'ramda';
import HandControls from "components/molecules/HandControls";
import Room from "components/scenes/Room";

// Breast cancer, no significant points :(
// import sampleData from "data/100k_breast_cancer.coords.json";

// Height:
//import sampleData from "data/90k_GIANT_height_filtered.gene_loc.coords.json";

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
  rsID: queryParams.rsid || initialState.rsID,
  gene: queryParams.gene || initialState.gene,
  pointCount: (queryParams.points && parseInt(queryParams.points, 10)) || initialState.pointCount
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
    const sceneOpts = {
      stats: typeof queryParams.stats !== "undefined"
    };

    return (
      <Provider store={store}>
        <a-scene {...sceneOpts}>
          {
            // Camera wrapped in a positional entity because VR headsets apply their own position, which overrides
            // the position attribute on a camera. This allows both monitor and headset position to be similar.
          }
          <a-entity id="rig" position="0 -2 0">
            <a-entity
              id="userCamera"
              look-controls
              wasd-controls
              raycaster="objects: .data-point"
            >
              {!this.state.inVR && (<a-entity
                geometry="primitive: ring; radius-inner: 0.0005; radius-outer: 0.001"
                id="reticle"
                cursor="fuse: true; fuseTimeout: 500"
                position="0 0 -0.1"
                material='color: "black"; opacity: 0.4'
              />)}
            </a-entity>
          </a-entity>

          <a-light type="ambient" color="#ffffff" intensity="0.9" />
          <a-light type="point" color="#ffffff" intensity="0.4" distance="50" position="0 -1 0" />

          <HandControls />

          <Room
            dataURL={decodeURIComponent(queryParams.data || "data%2F90k_GIANT_height_filtered.gene_loc.coords.json")}
            chrURL={decodeURIComponent(queryParams.chr || "data%2Fhomo_sapiens_chrInfo.json")}
            cytoURL={decodeURIComponent(queryParams.cyto || "data%2Fhomo_sapiens_cytobands.json")}
            datasetsURL={queryParams.datasets && decodeURIComponent(queryParams.datasets)}
          />

          {this.state.inVR && <div>Now displaying in VR....</div>}
        </a-scene>
      </Provider>
    );
  }
}

export default App;
