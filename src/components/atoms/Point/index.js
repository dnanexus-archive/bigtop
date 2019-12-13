import 'aframe';
import 'aframe-particle-system-component';
import {Entity} from 'aframe-react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from './actions';

class Point extends Component {
  constructor() {
    super();

    this.onEnter = this.onEnter.bind(this);
  }

  onEnter() {
    this.props.setSelectedPoint(this.props.datum.id);
  }

  render() {
    const {
      datum,
      gene,
      highlightColor,
      rsID,
      size,
      color
    } = this.props;

    const highlighted = datum.id === rsID || (gene && (new RegExp(gene, "i")).test(datum.gene));

    return (
      <Entity
        id={datum.id}
        gene={datum.gene}
        geometry={{primitive: 'sphere', radius: size}}
        material={{color: highlighted ? highlightColor : color, metalness: 0.5}}
        position={{x: datum.coords[0], y: datum.coords[1], z: datum.coords[2]}}
        events={{
          click: this.onEnter
        }}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  gene: state.gene,
  highlightColor: state.highlightColor,
  rsID: state.rsID
});

export default connect(mapStateToProps, actionCreators)(Point);
