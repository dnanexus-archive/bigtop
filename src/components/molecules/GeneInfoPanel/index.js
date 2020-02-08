import React, {Component} from 'react';
import {format as d3Format} from 'd3-format';
import InfoPanel from '../InfoPanel';

require('aframe-look-at-component');

class GeneInfoPanel extends Component {
  render() {
    const {data} = this.props;
    const {id, gene, p, frequency, chr, location} = data;

    return <InfoPanel position={this.props.position} scale={this.props.scale} rotation={this.props.rotation} look-at="[camera]">
      <a-text
          font="fonts/Roboto-msdf.json"
          value={`${id}\n${gene}\n\n\n\n`}
          align="center"
          color="white"
          width="1"
      />
      <a-entity position="0 -.01 0" scale="0.7 0.7 0.7">
        <a-entity position="0.25 0 0">
          <a-text
            font="fonts/Roboto-msdf.json"
            value="p:"
            color="rgb(128, 128, 128)"
          />
          <a-text
            font="fonts/Roboto-msdf.json"
            value={p.toExponential(4)}
            color="white"
            position="0.037 0 0"
          />
        </a-entity>
        <a-entity position="-0.25 0 0">
          <a-text
            font="fonts/Roboto-msdf.json"
            value="%"
            color="rgb(128, 128, 128)"
            align="right"
            position="0 0 0"
          />
          <a-text
            font="fonts/Roboto-msdf.json"
            value={d3Format('.1f')(frequency * 100)}
            color="white"
            align="right"
            position="-0.035 0 0"
          />
        </a-entity>
      </a-entity>
      <a-text
        font="fonts/Roboto-msdf.json"
        value={`${chr}:${d3Format(`,.${location.toString().length}r`)(location)}`}
        color="white"
        align="center"
        position="0 -0.08 0"
      />
    </InfoPanel>;
  }
}

export default GeneInfoPanel;
