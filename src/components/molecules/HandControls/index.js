import React, {Component} from 'react';
import {Entity} from 'aframe-react';
import pathOr from 'ramda/src/pathOr'

class HandControls extends Component {
  render() {
    const {user = {}, room = {}} = this.props;

    return (
      <Entity position={{y: -pathOr(0, ['height'], room) / 2}}>
        <Entity id="rightHand" laser-controls={{hand: pathOr(true, ['rightHanded'], user) ? 'right' : 'left'}} />
        <Entity id="leftHand" hand-controls={pathOr(true, ['rightHanded'], user) ? 'left' : 'right'} />
      </Entity>
    )
  }
};

export default HandControls;
