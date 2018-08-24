import 'aframe';
import {Entity} from 'aframe-react';
import React, {Component} from 'react';
import {format as d3Format} from 'd3-format';
import InfoPanel from '../InfoPanel';

class GeneInfoPanel extends Component {
  render() {
    const {data} = this.props;
    const {id, gene, p, frequency, chr, location} = data;

    const panelText = [
      id,
      gene,
      `p: ${p.toExponential()}`,
      `freq: ${frequency}`,
      `${chr}:${d3Format(',.2r')(location)}`
    ].join('\n');

    return <InfoPanel position={this.props.position} scale={this.props.scale} rotation={this.props.rotation}>
      <Entity
        text={{
          value: panelText,
          align: 'center',
          color: 'white',
          width: 1
        }}
      />
    </InfoPanel>;
  }
}

export default GeneInfoPanel;
