import 'aframe';
import 'aframe-particle-system-component';
import 'aframe-glow';
import {Entity} from 'aframe-react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from './actions';

// var audio = new Audio("../../../data/tone-beep.wav");

class Point extends Component {
  constructor() {
    super();

    this.onEnter = this.onEnter.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseDepart = this.onMouseDepart.bind(this);

    this.state = {
      glow: false
    };
  }

  onEnter() {
    this.props.setSelectedPoint(this.props.datum.id);
  }

  onMouseOver() {
    this.setState({glow: true});
  }
  onMouseDepart() {
    this.setState({glow: false});
  }

  render() {
    const {
      datum,
      size
    } = this.props;

    const colorScheme = ['#E41A1C', '#A73C52', '#6B5F88', '#3780B3', '#3F918C', '#47A266','#53A651', '#6D8470', '#87638F', '#A5548D', '#C96555', '#ED761C','#FF9508', '#FFC11A', '#FFEE2C', '#EBDA30', '#CC9F2C', '#AD6428','#BB614F', '#D77083', '#F37FB8', '#DA88B3', '#B990A6', '#999999'];
    const chroms = ['chr1', 'chr2', 'chr3', 'chr4', 'chr5', 'chr6', 'chr7', 'chr8', 'chr9', 'chr10', 'chr11', 'chr12', 'chr13', 'chr14', 'chr15', 'chr16', 'chr17', 'chr18', 'chr19', 'chr20', 'chr21', 'chr22', 'chrX', 'chrY'];

    function shadeColor2(color, percent) {
      var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF; // eslint-disable-line no-mixed-operators
      return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
    }

    var shade = shadeColor2(colorScheme[chroms.indexOf(datum.chr)], -0.25);

    return (
      <Entity
        id={datum.id}
        gene={datum.gene}
        geometry={{primitive: 'sphere', radius: size}}
        material={{color: shade, metalness: 0.5}}
        position={{x: datum.coords[0], y: datum.coords[1], z: datum.coords[2]}}
        glow={{enabled: this.state.glow}}
        events={{
          click: this.onEnter,
          mouseenter: this.onMouseOver,
          mouseleave: this.onMouseDepart
        }}
      />
    );
  }
}

export default connect(null, actionCreators)(Point);
