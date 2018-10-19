import 'aframe';
import {Entity} from 'aframe-react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as R from 'ramda';
import GeneInfoPanel from 'components/molecules/GeneInfoPanel';
import {polarToCartesian} from 'utils';
import * as actionCreators from './actions';

class SelectedPoint extends Component {
  componentDidMount() {
    window.addEventListener("keyup", (e) => {
      if (e.keyCode === 27) { // Escape
        this.props.clearSelectedPoint();
      }
    });
  }

  render() {
    const {
      points,
      radius,
      selectedPoint,
      sizeScaler
    } = this.props;

    if (!this.props.selectedPoint)
      return null;

    const datum = R.find((point) => point.id === selectedPoint, points)
    const size = sizeScaler(datum.coords[1]);

    let pointDistance = Math.cbrt(Math.pow(Math.abs(datum.coords[0]), 3) + Math.pow(Math.abs(datum.coords[2]), 3) + Math.pow(Math.abs(datum.coords[1]), 3))
    let r = (datum.radius + radius) / 2
    let {x, z} = polarToCartesian(r, datum.theta);

    // switching infopanel location based on height
    let infoHeight = pointDistance / 7;
		if (datum.coords[1] >= 4) {
      infoHeight = -infoHeight;
		}


    return (
     <Entity
        geometry={{primitive: 'sphere', radius: size + 0.002}}
        material={{color: 'yellow'}}
        position={{x: datum.coords[0], y: datum.coords[1], z: datum.coords[2]}}
    >
        <Entity
          geometry={{primitive: 'cylinder', radius: 0.01, thetaStart: 90, height: datum.coords[1], openEnded: true}}
          material={{color: 'white', shader: 'flat'}}
          position={{x: 0, y: -datum.coords[1]/2, z: 0}}
        />
        <Entity
          geometry={{primitive: 'cylinder', radius: 0.01, thetaStart: 90, height: radius+datum.radius, openEnded: true}} material={{color: 'white', shader: 'flat'}}
          position={{x: x, y: 0, z: z}}
          rotation={{x:90, y: -((datum.theta*180) / Math.PI), z: 0}}
        />
        <GeneInfoPanel
          position={{x: 0, y: infoHeight, z: 0}}
          scale={{x: pointDistance, y: pointDistance, z: pointDistance}}
          data={datum /* Only a little weird to turn a datum into data, but the datum does contain many data.... */}
        />

    </Entity>
    );
  }
}

const mapStateToProps = (state) => ({selectedPoint: state.user.selectedPoint});

export default connect(mapStateToProps, actionCreators)(SelectedPoint);
