import React, {Component} from 'react';
import {format as d3Format} from 'd3-format';
import InfoPanel from '../InfoPanel';

require('aframe-look-at-component');

class GeneInfoPanel extends Component {
  render() {
    const {data, position, scale, rotation} = this.props;
    const {id, gene, p, frequency, chr, location} = data;

    return <InfoPanel position={position} scale={scale} rotation={rotation} look-at="[camera]">
      <a-text
          font="fonts/Roboto-msdf.json"
          value={`${id}\n${gene}\n\n\n\n`}
          align="center"
          color="white"
          width="1"
      />
      <a-entity position="0 -.01 0" scale="0.15 0.15 1">
        <a-entity>
          <a-text
            font="fonts/Roboto-msdf.json"
            value="p:"
            color="rgb(128, 128, 128)"
            position="-0.3 0 0"
          />
          <a-text
            font="fonts/Roboto-msdf.json"
            value={p.toExponential(4)}
            color="white"
            position="-0.105 0 0"
          />
        </a-entity>
        <a-entity position="-0.5 0 0">
          <a-text
            font="fonts/Roboto-msdf.json"
            value="%"
            color="rgb(128, 128, 128)"
            align="right"
            position="0.1 0 0"
          />
          <a-text
            font="fonts/Roboto-msdf.json"
            value={d3Format('.1f')(frequency * 100)}
            color="white"
            align="right"
            position="-0.05 0 0"
          />
        </a-entity>
      </a-entity>
      <a-text
        font="fonts/Roboto-msdf.json"
        value={`${chr}:${d3Format(`,.${location.toString().length}r`)(location)}`}
        color="white"
        align="center"
        position="0 -0.08 0"
        scale="0.2 0.2 1"
      />
    </InfoPanel>;
  }
}

export default GeneInfoPanel;
