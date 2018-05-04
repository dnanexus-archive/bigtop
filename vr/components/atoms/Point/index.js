import React, {Component} from 'react';
import {Sphere} from 'react-vr';
import {connect} from 'react-redux';
import * as actions from './actions';

class Point extends Component {
  constructor() {
    super();

    this.state = {
      selected: false
    };
  }

  render() {
    let {cartesianCoords, id, selectable, radius = true} = this.props;

    const onEnter = () => {
      this.props.setSelectedPoint(id, cartesianCoords);
      this.setState({selected: true});
    }

    const onExit = () => {
      this.props.setSelectedPoint(null, null);
      this.setState({selected: false});
    }

    return (
        <Sphere
          radius={radius}
          lit={true}
          style={{
            transform: [{translate: cartesianCoords}],
            color: this.state.selected ? '#00bbff' : '#ffff00'
          }}
          onEnter={onEnter}
          onExit={onExit}
        >
        </Sphere>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    radius: state.world.radius / 500
  }
}

export default connect(mapStateToProps, actions)(Point);
