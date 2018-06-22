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
          else {


            return datum.coords[1]-2.5;

         } 

      }

      return (
        <Entity
          geometry={{primitive: 'cylinder', radius: 0.02, height: 5, openEnded: true}}
          material={{color: 'white', shader: 'flat'}}
          position={{x: datum.coords[0], y: datum.coords[1]+2.5, z: datum.coords[2]}}
        />  
      );  
  }

}

export default Branches;
 
