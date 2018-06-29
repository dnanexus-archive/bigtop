import 'aframe';
import 'aframe-particle-system-component';
import {Entity} from 'aframe-react';
import React, {Component} from 'react';

class Text extends Component {
	changeColor() {
		const colors = ['red', 'orange', 'yellow', 'green', 'blue'];
		this.setState({
		color: colors[Math.floor(Math.random() * colors.length)]
	});
	}

  render() {

  const {
    datum
  } = this.props;

  return (
		<Entity
			text={{	value: 'Arrays start at 0!',
							align: "center",
							width: 15}}
			events={{click: this.changeColor.bind(this)}}
			position="0 -2 -2"
		/>
  );
  }
}

export default Text;
