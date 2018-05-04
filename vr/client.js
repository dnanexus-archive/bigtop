// Auto-generated content.
// This file contains the boilerplate to set up your React app.
// If you want to modify your application, start in "index.vr.js"

// Auto-generated content.
import {VRInstance} from 'react-vr-web';
import * as THREE from 'three';
import * as OVRUI from 'ovrui';
import ControllerRayCaster from 'react-vr-controller-raycaster';
import {createChromosomeScale} from './utils';
import R from "ramda";
import * as d3 from "d3-shape";


const chroms = ['chr1', 'chr2', 'chr3', 'chr4', 'chr5', 'chr6', 'chr7', 'chr8', 'chr9', 'chr10', 'chr11', 'chr12', 'chr13', 'chr14', 'chr15', 'chr16', 'chr17', 'chr18', 'chr19', 'chr20', 'chr21', 'chr22', 'chrX', 'chrY'];
const sizes = [248956422, 242193529, 198295559, 190214555, 181538259, 170805979, 159345973, 145138636, 138394717, 133797422, 135086622, 133275309, 114364328, 107043718, 101991189, 90338345, 83257441, 80373285, 58617616, 64444167, 46709983, 50818468, 156040895, 57227415];
const chromList = R.values(createChromosomeScale(chroms, sizes));
const colorScheme = ['#E41A1C', '#A73C52', '#6B5F88', '#3780B3', '#3F918C', '#47A266','#53A651', '#6D8470', '#87638F', '#A5548D', '#C96555', '#ED761C','#FF9508', '#FFC11A', '#FFEE2C', '#EBDA30', '#CC9F2C', '#AD6428','#BB614F', '#D77083', '#F37FB8', '#DA88B3', '#B990A6', '#999999'];


function drawFloorPizza(context, radius, chromList) {
  var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.size; });

  var arc = d3.arc()
    .outerRadius(radius)
    .innerRadius(0)
    .context(context);

  var arcs = pie(chromList);

  arcs.forEach(function(d, i) {
    context.beginPath();
    arc(d);
    context.fillStyle = colorScheme[i];
    context.fill();
  });
}

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
  const w = 2560;
  const h = 2560;

  canvas.width = w;
  canvas.height = h;
  const cx = canvas.getContext('2d');

  var radius = w / 2;
  cx.rotate(-90 * (Math.PI / 180));
  cx.translate(-radius, radius); // center
  cx.rotate(-180 * (Math.PI / 180));

  drawFloorPizza(cx, radius, chromList);
  vr.registerTextureSource('fps', canvas);

  vr.render = function(ms) {
    // Draw anything here that needs to update in every draw cycle
  };

  vr.start();
  return vr;
}

window.ReactVR = {init};
