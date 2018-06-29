import 'aframe';
import 'aframe-particle-system-component';
import {Entity} from 'aframe-react';
import React, {Component} from 'react';


class Branches extends Component {
  render() {

      const {
        datum
      } = this.props;


      function getScale() {
          // assigns a branch a scale to roof or the ceiling 
          if (datum.coords[1] >= 0 && datum.coords[1] <= 5) {

            return datum.coords[1]+2.5;
 
          }
          else if ( datum.coords[1] >= -5 && datum.coords[1] < 0) {


            return datum.coords[1]-2.5;

         } 

      }

      return (
        <Entity
          geometry={{primitive: 'cylinder', radius: 0.01, thetaStart: 90, height: 5, openEnded: true}}
          material={{color: 'white', shader: 'flat'}}
          position={{x: datum.coords[0], y: getScale(), z: datum.coords[2]}}
        />  
      );  
  }

}

export default Branches;
 
