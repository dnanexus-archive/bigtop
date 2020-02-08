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
    <a-entity>
      <a-entity
        geometry={`primitive: ring; radius-inner: ${radialPosition}; radius-outer: ${radialPosition + ringWidth}`}
        position={`0 ${yPosition} 0`}
        rotation="270 0 180"
        material="color: black"
      />
      {
        R.map(function(direction) {
          return (
            <a-entity rotation={`0 ${direction} 0`} key={direction}>
              {/* floor radius tick marks: 10%, 20%, etc. */}
              <a-text
                font="fonts/Roboto-msdf.json"
                value={`${value * 100}%`}
                align="center"
                width="5"
                color="black"
                position={`0, ${yPosition} ${-radialPosition}`}
                rotation="270 0 0"
              />
            </a-entity>
          )
        }, [0, 90, 180, 270])
      }
    </a-entity>
  );
  }
}

export default FloorAxisTick;
