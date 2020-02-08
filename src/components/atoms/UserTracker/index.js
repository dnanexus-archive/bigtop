import React from 'react';
import {connect} from 'react-redux';

/*
** A wrapper component that applies a position to any children based on the current user position.
** Note that this does NOT apply any rotation, e.g. a child component with a Z position of -2 will
** always be 2 units away from the user based on the world Z axis, regardless of user rotation.
*/

const UserTracker = (props) => (
  <a-entity position={`${props.coords[0]} ${props.coords[1]} ${props.coords[2]}`}>
    {props.children}
  </a-entity>
);

const mapStateToProps = (state) => {
  return {
    coords: state.user.worldPosition
  };
};

export default connect(mapStateToProps)(UserTracker);