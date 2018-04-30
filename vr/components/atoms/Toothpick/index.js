import React, {Component} from 'react';
import {Cylinder} from 'react-vr';
import {connect} from 'react-redux';

class Toothpick extends Component {
  constructor() {
    super();

    this.state = {
    };
  }

  render() {
    let {selectedId, cartesianCoords, eyeHeight} = this.props;

    return (selectedId != null) ? (
      <Cylinder
        radiusTop={0.5}
        radiusBottom={0.5}
        lit={true}
        dimHeight={cartesianCoords[1] + eyeHeight}
        style={{
          transform: [{translate: [cartesianCoords[0], (cartesianCoords[1] - eyeHeight) * 0.5, cartesianCoords[2]]}],
          color: '#888'
        }}
      >
      </Cylinder>
    ) : null;
  }
}

const mapStateToProps = (state) => {
  return {
    eyeHeight: state.world.eyeHeight,
    selectedId: state.user.selectedPoint,
    cartesianCoords: state.user.selectedCoords
  }
}

export default connect(mapStateToProps)(Toothpick);
