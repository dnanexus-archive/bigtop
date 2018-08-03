import 'aframe';
import 'aframe-particle-system-component';
import {Entity} from 'aframe-react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as R from 'ramda';
import InfoPanel from 'components/molecules/InfoPanel';
import {polarToCartesian} from 'utils';    

class SelectedPoint extends Component {
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

    let pointDistance = Math.sqrt(Math.pow(datum.coords[0], 2) + Math.pow(datum.coords[2], 2))
    var r = (datum.radius + radius) / 2
    let {x, z} = polarToCartesian(r, datum.theta);
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
        <InfoPanel
          position={{x: 0, y: 0.3 + (pointDistance / 40), z: 0}}
          scale={{x: pointDistance, y: pointDistance, z: pointDistance}}
          rotation={{x: 0, y: datum.theta * -57.2958, z: 0}}
          text={[datum.id, datum.gene, `p: ${datum.p}`, `freq: ${datum.frequency}`, `${datum.chr}:${datum.location}`].join('\n')}
        />

    </Entity>
    );
  }
}

const mapStateToProps = (state) => ({selectedPoint: state.user.selectedPoint});

export default connect(mapStateToProps)(SelectedPoint);
