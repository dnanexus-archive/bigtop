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
      <a-sphere
        id={datum.id}
        gene={datum.gene}
        radius={size}
        color={highlighted ? highlightColor : color}
        metalness={0.5}
        position={datum.coords.join(" ")}
        onClick={this.onEnter}
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
