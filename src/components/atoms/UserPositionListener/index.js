import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from './actions';

/*
** A helper component that listens for camera position updates once mounted and updates the Redux
** store. It render no components of consequence, and only one needs to be included in the entire app.
*/

class UserPositionListener extends Component {
  componentDidMount() {
    const {updateUserPosition} = this.props;
    const camera = document.querySelector('#userCamera');

    camera.addEventListener('componentchanged', function (evt) {
      if (evt.detail.name !== 'position')
        return;

      // Three.js was never known for its simple approach to... well, anything.
      const worldPos = new window.THREE.Vector3();
      worldPos.setFromMatrixPosition(camera.object3D.matrixWorld);
      updateUserPosition(worldPos.x, worldPos.y, worldPos.z);
    });
  }

  render() {
    return <div />;
  }
}

export default connect(() => ({}), actionCreators)(UserPositionListener);