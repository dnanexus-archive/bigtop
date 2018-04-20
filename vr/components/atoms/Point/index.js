import React from 'react';
import {Sphere} from 'react-vr';
import {connect} from 'react-redux';
import * as actions from './actions';

const Point = (props) => {
  let {cartesianCoords, id, selectable = true, selectedPoint} = props;

  const onEnter = () => props.setSelectedPoint(id)
  const onExit = () => props.setSelectedPoint(null)

  return (
      <Sphere
        radius={2}
        lit={true}
        style={{
          transform: [{translate: cartesianCoords}],
          color: selectedPoint === id ? '#00bbff' : '#ffff00'
        }}
        onEnter={onEnter}
        onExit={onExit}
      >
      </Sphere>
  )
}

const mapStateToProps = (state) => {
  return {
    selectedPoint: state.user.selectedPoint
  }
}

export default connect(mapStateToProps, actions)(Point);
