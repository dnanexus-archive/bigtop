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

  const canvas = document.createElement('canvas');
  const w = 256;
  const h = 256;
  const pad = 50;

  canvas.width = w;
  canvas.height = h;
  const cx = canvas.getContext('2d')
  cx.rotate(-90 * (Math.PI / 180));

  vr.registerTextureSource('fps', canvas);

  vr.render = function(ms) {
    cx.fillText("100,100",100, 100);
    cx.fillText("100,-100",100, -100);
    cx.fillText("-50,50",-50, 50);
    cx.fillText("-100,-100",-100, -100);
  };

  vr.start();
  return vr;
}

window.ReactVR = {init};
