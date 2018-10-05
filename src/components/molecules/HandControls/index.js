import React, {Component} from 'react';
import {Entity} from 'aframe-react';
import {connect} from 'react-redux';
import pathOr from 'ramda/src/pathOr'

class HandControls extends Component {
  render() {
    const {rightHanded = true, roomHeight = 0} = this.props;

    return (
      <Entity position={{y: -roomHeight / 2}}>
        <Entity id="rightHand" laser-controls={{hand: rightHanded ? 'right' : 'left'}} />
        <Entity id="leftHand" hand-controls={rightHanded ? 'left' : 'right'} />
      </Entity>
    )
  }
};

const mapStateToProps = (state) => ({
  rightHanded: pathOr(true, ['user', 'rightHanded'], state),
  roomHeight: pathOr(0, ['room', 'height'], state)
});

export default connect(mapStateToProps)(HandControls);
