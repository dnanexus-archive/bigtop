import 'aframe';
import 'aframe-particle-system-component';
import {Entity} from 'aframe-react';
import * as R from 'ramda';
import React, {Component} from 'react';

class FloorAxisTick extends Component {
  render() {

  const {
    value,
    radialPosition,
    yPosition
  } = this.props;

  const ringWidth = 0.01;

  return (
    <Entity>
      <Entity
        geometry={{primitive: 'ring', radiusInner: radialPosition, radiusOuter: radialPosition + ringWidth}}
        position={{x:0, y: yPosition, z: 0}}
        rotation={{x: 270, y: 0, z: 180}}
        material={{color: 'black'}}
      />
      {
        R.map(function(direction) {
          return (
            <Entity rotation={{y: direction}} key={direction}>
              <Entity
                text={{ value: value,
                        align: "center",
                        width: 5}}
                position={{x: 0, y: yPosition, z: -radialPosition}}
                rotation={{x: 270, y: 0, z: 0}}
              />
            </Entity>
          )
        }, [0, 90, 180, 270])
      }
    </Entity>
  );
  }
}

export default FloorAxisTick;
