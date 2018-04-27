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
    let {cartesianCoords, id, selectable = true} = this.props;

    const onEnter = () => {
      this.props.setSelectedPoint(id);
      this.setState({selected: true});
    }

    const onExit = () => {
      this.props.setSelectedPoint(null);
      this.setState({selected: false});
    }

    return (
        <Sphere
          radius={2}
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
  return {}
}

export default connect(mapStateToProps, actions)(Point);
