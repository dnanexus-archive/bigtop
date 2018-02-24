// Auto-generated content.
// This file contains the boilerplate to set up your React app.
// If you want to modify your application, start in "index.vr.js"

// Auto-generated content.
import {VRInstance} from 'react-vr-web';
import * as THREE from 'three';
import * as OVRUI from 'ovrui';
import ControllerRayCaster from 'react-vr-controller-raycaster';

function init(bundle, parent, options) {
  const scene = new THREE.Scene();

  const vr = new VRInstance(bundle, 'manhattan_project', parent, {
    ...options,
    scene,
    raycasters: [
      new ControllerRayCaster({scene, color: '#ff0000'}),
      new OVRUI.MouseRayCaster(),
    ],
    cursorVisibility: 'visible'
  });
  vr.render = function() {
    // Any custom behavior you want to perform on each frame goes here
  };
  // Begin the animation loop
  vr.start();
  return vr;
}

window.ReactVR = {init};
