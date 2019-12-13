import "aframe";
import "aframe-animation-component";
import {Entity, Scene} from "aframe-react";
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
    const state = store.getState();
    const roomHeight = state.room.height;
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

          <HandControls />

          <Room
            dataURL={decodeURIComponent(queryParams.data || "data%2F90k_GIANT_height_filtered.gene_loc.coords.json")}
            chrURL={decodeURIComponent(queryParams.chr || "data%2Fhomo_sapiens_chrInfo.json")}
            cytoURL={decodeURIComponent(queryParams.cyto || "data%2Fhomo_sapiens_cytobands.json")}
            datasetsURL={queryParams.datasets && decodeURIComponent(queryParams.datasets)}
          />

          {this.state.inVR && <div>Now displaying in VR....</div>}
        </Scene>
      </Provider>
    );
  }
}

export default App;
