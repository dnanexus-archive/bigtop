import 'aframe';
import 'aframe-particle-system-component';
import {Entity} from 'aframe-react';
import React, {Component} from 'react';
import {polarToCartesian} from 'utils';

class Branches extends Component {
  
  constructor() {
    super();
    this.state = {
      active: false
    };

    this.onEnter = this.onEnter.bind(this);
    this.onExit = this.onExit.bind(this);
  }
  onEnter() {
    this.setState({active: true});
  }

  onExit() {
    this.setState({active: false});
  }


  render() {

      const {
        datum,
        height,
        rotate,
        radius
      } = this.props;

      // assigns a branch a scale to roof or the ceiling
      function getScale() {
          
          var halfHeight = height/2
          if (datum.coords[1] >= halfHeight && datum.coords[1] <= height) {

            return datum.coords[1]+halfHeight/2;
 
          }
          else if ( datum.coords[1] >= height-height && datum.coords[1] < halfHeight) {

            return datum.coords[1]-halfHeight/2;

          } 

      }
    
      //if (this.state.active) {
  
        if ( rotate === true ) {
            var r = (datum.radius + radius) / 2
            let {x, z} = polarToCartesian(r, datum.theta);
            return (
                //{ this.state.active &&
                    <Entity
                        geometry={{primitive: 'cylinder', radius: 0.01, thetaStart: 90, height: radius-datum.radius, openEnded: true}}
                        material={{color: 'white', shader: 'flat'}}
                        position={{x:x, y: datum.coords[1], z: z}}
                        rotation={{x:90, y: -((datum.theta*180) / Math.PI), z: 0}} 
                        //events={{ mouseenter: this.onEnter }}
                    />  
                //}
            );
        }
        else {
             return (
                <Entity
                    geometry={{primitive: 'cylinder', radius: 0.01, thetaStart: 90, height: datum.coords[1], openEnded: true}}
                    material={{color: 'white', shader: 'flat'}}
                    position={{x: datum.coords[0], y: datum.coords[1]/2, z: datum.coords[2]}}
                />  
            );
        }
  
    //}
  }
}

export default Branches;
 
