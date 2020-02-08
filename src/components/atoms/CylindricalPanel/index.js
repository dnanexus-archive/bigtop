import React, {Component} from 'react';

class CylindricalPanel extends Component {
  render() {

  const {
    start,
    length,
    radius,
    height,
    color,
    yPosition = 0,
    openEnded = true
  } = this.props;

  return (
    <a-entity
      geometry={`
        primitive: cylinder;
        openEnded: ${openEnded};
        thetaStart: ${start};
        thetaLength: ${length};
        radius: ${radius};
        height: ${height}
      `}
      material={`color: ${color}; side: double`}
      position={`0 ${yPosition} 0`}
      />
    );
  }
}

export default CylindricalPanel;
