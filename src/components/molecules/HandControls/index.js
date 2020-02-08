import React, {Component} from 'react';
import {connect} from 'react-redux';
import pathOr from 'ramda/src/pathOr'

class HandControls extends Component {
  render() {
    const {rightHanded = true, roomHeight = 0} = this.props;

    return (
      <a-entity position={`0 ${-roomHeight / 2} 0`}>
        <a-entity id="rightHand" laser-controls={`hand: ${rightHanded ? 'right' : 'left'}`} />
        <a-entity id="leftHand" hand-controls={rightHanded ? 'left' : 'right'} />
      </a-entity>
    )
  }
};

const mapStateToProps = (state) => ({
  rightHanded: pathOr(true, ['user', 'rightHanded'], state),
  roomHeight: pathOr(0, ['room', 'height'], state)
});

export default connect(mapStateToProps)(HandControls);
