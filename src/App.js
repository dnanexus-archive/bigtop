import 'aframe';
import 'aframe-particle-system-component';
import 'aframe-animation-component';
import {Entity, Scene} from 'aframe-react';
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import Forest from 'components/molecules/Forest';
import PointCloud from 'components/molecules/PointCloud';
import Rotunda from 'components/complexes/Rotunda';
import Floor from 'components/complexes/Floor';
import data from 'data/90k_GIANT_height_filtered.gene_loc.coords.json';
import cytobands from 'data/human_genome_cytoband_edges.json';
import {createChromosomeScale, calculateCoordinates} from 'utils';
import configureStore from './store/configureStore';
import initialState from './store/initialState';

const store = configureStore(initialState);

class App extends Component {

  render() {

    const roomRadius = 10; // meters
    const roomHeight = 10; // meters

    const chroms = ['chr1', 'chr2', 'chr3', 'chr4', 'chr5', 'chr6', 'chr7', 'chr8', 'chr9', 'chr10', 'chr11', 'chr12', 'chr13', 'chr14', 'chr15', 'chr16', 'chr17', 'chr18', 'chr19', 'chr20', 'chr21', 'chr22', 'chrX', 'chrY'];
    const sizes = [248956422, 242193529, 198295559, 190214555, 181538259, 170805979, 159345973, 145138636, 138394717, 133797422, 135086622, 133275309, 114364328, 107043718, 101991189, 90338345, 83257441, 80373285, 58617616, 64444167, 46709983, 50818468, 156040895, 57227415];
    const chromDict = createChromosomeScale(chroms, sizes);
    const colorScheme = ['#E41A1C', '#A73C52', '#6B5F88', '#3780B3', '#3F918C', '#47A266','#53A651', '#6D8470', '#87638F', '#A5548D', '#C96555', '#ED761C','#FF9508', '#FFC11A', '#FFEE2C', '#EBDA30', '#CC9F2C', '#AD6428','#BB614F', '#D77083', '#F37FB8', '#DA88B3', '#B990A6', '#999999'];

    let {coordinates, yScaleDomain, radiusScaleInfo} = calculateCoordinates(data, chromDict, roomRadius, roomHeight);

    let someCoordinates = [];
    for (let i = 0; i < 300; i++) {
      someCoordinates.push(coordinates[i]);
    }
    coordinates = someCoordinates;

    const sceneOpts = {
      style: "position: absolute; height: 100%; width: 100%"
    };

    //<Forest data={coordinates} height={roomHeight} rotate={true} radius={roomRadius} /> 
     //<Forest data={coordinates} height={roomHeight} rotate={false} radius={roomRadius} />

    return (
      <Provider store={store}>
        <Scene {...sceneOpts}>
          {
            // Camera wrapped in a positional entity because VR headsets apply their own position, which overrides
            // the position attribute on a camera. This allows both monitor and headset position to be similar.
          }
          <Entity position="0 -5.4 0">
            <Entity primitive="a-camera" position="0 2.4 0" look-controls raycaster="objects: .data-point">
              <Entity
                cursor
                geometry={{primitive: 'ring', radiusInner: 0.0001, radiusOuter: 0.00025}}
                position={{x:0, y: 0, z: -0.01}}
                material={{color: 'black', shader: 'flat', opacity: 0.4}}
              />
            </Entity>
          </Entity>
          <Forest data={coordinates} height={roomHeight} rotate={false} radius={roomRadius} /> 
          <Forest data={coordinates} height={roomHeight} rotate={true} radius={roomRadius} />
          <PointCloud data={coordinates} height={roomHeight} />
          <Rotunda radius={roomRadius} height={roomHeight} chromDict={chromDict} cytobands={cytobands} colorScheme={colorScheme} yScaleDomain={yScaleDomain} />
          
          <Entity light={{type: 'point'}} position="0 -2 0" />
          <Entity light={{type: 'ambient', color: '#ffffff', intensity: 0.2}} />
          <Floor radius={roomRadius} yPosition={-roomHeight / 2} radiusScaleInfo={radiusScaleInfo} />

          <div>Now displaying in VR....</div>
        </Scene>
      </Provider>
    );
  }
}

export default App;
