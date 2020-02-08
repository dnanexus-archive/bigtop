import React, {Component} from 'react';

class PointPlane extends Component {
  render() {
    const {
      points,
      height,
      radius
    } = this.props;

    const fillColor = 'rgba(40, 40, 40, 0.8)';
    const canvasSize = 8192; // Must be a power of 2
    const pixelsPerMeter = canvasSize / 2 / radius;
    const pointSize = 0.02 * pixelsPerMeter;

    const canvas = document.createElement('canvas');
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = fillColor;
    for (let point of points) {
      const canvasX = canvasSize / 2 + point.coords[0] * pixelsPerMeter;
      const canvasY = canvasSize / 2 + point.coords[2] * pixelsPerMeter; 
      ctx.beginPath();
      ctx.arc(canvasX, canvasY, pointSize, 0, Math.PI * 2, true);
      ctx.fill();
    }

    return (
      <a-plane
        height={radius * 2}
        width={radius * 2}
        position={`0 ${-height / 2 + 0.02} 0`}
        rotation="-90 0 0"
        src={canvas.toDataURL()}
        opacity="0.7"
      />
    );
  }
}

export default PointPlane;
