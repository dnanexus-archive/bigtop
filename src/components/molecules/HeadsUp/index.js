import React, {Component} from 'react';

class HeadsUp extends Component {
  render() {
    const {
      text
    } = this.props;

    return (
			<a-plane
				height="0.05"
				width="3"
				position="0 -0.145 -0.2"
				opacity="0.9"
				color="yellow"
      >
				<a-text
					font="fonts/Roboto-msdf.json"
					value={text}
					align="center"
					color="teal"
					width="1"
				/>
			</a-plane>
    );
  }
}

export default HeadsUp;
