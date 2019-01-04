import 'aframe';
import 'aframe-particle-system-component';
import {Entity} from 'aframe-react';
import React, {Component} from 'react';

class HeadsUp extends Component {
  render() {
    const {
      text
    } = this.props;

    return (
			<Entity
				geometry={{primitive: 'plane', height: 0.05, width: 3}}
				// optimal position = 0, -0.6, -0.2
				position="0 -0.145 -0.2"
				material={{color: 'yellow', shader: 'flat', opacity: 0.9}}
      >
				<Entity
					text={{
						font: "fonts/Roboto-msdf.json",
						value: text,
						align: "center",
						color: "teal",
						width: 1
					}}
				/>
			</Entity>
    );
  }
}

export default HeadsUp;
