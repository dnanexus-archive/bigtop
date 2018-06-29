import 'aframe';
import 'aframe-particle-system-component';
import {Entity} from 'aframe-react';
import React, {Component} from 'react';
import {polarToCartesian} from 'utils';

class Branches extends Component {
  render() {

      const {
        datum,
        radius,
        height,
        rotate
      } = this.props;


      function getYScale() {
          
          var halfHeight = height/2.0

          // assigns a branch a scale to roof or the ceiling 
          if (datum.coords[1] >= 0 && datum.coords[1] <= halfHeight) {

            return datum.coords[1]+halfHeight/2.0;
 
          }
          else if ( datum.coords[1] >= -halfHeight && datum.coords[1] < 0) {

            return datum.coords[1]-halfHeight/2.0;

          } 

      }
      
      function getXScale() {
         
          var halfRadius = radius/2.0

          // assigns a branch a scale to roof or the ceiling 
          if (datum.coords[0] >= 0 && datum.coords[0] <= halfRadius) {

            return datum.coords[0]+halfRadius/2.0;
 
          }
          else if ( datum.coords[0] >= -halfRadius && datum.coords[0] < 0) {

            return datum.coords[0]-halfRadius/2.0;

          }
      
      }


      if ( rotate == true ) {
         // average the point radius and room radius 
         //let {x, z} = polarToCartesian(radius, (datum.radius + radius) / 2) );
         //datum.coords[0] = x
         return (
            <Entity
              geometry={{primitive: 'cylinder', radius: 0.01, thetaStart: 90, height: 5, openEnded: true}}
              material={{color: 'white', shader: 'flat'}}
              position={{x: datum.coords[0], y: datum.coords[1], z: datum.coords[2]}}
              rotation={{x:90, y: (datum.theta*180) / Math.PI, z:0}} 
           />  
         );
      }
      else {

         return (
            <Entity
              geometry={{primitive: 'cylinder', radius: 0.01, thetaStart: 90, height: 5, openEnded: true}}
              material={{color: 'white', shader: 'flat'}}
              position={{x: datum.coords[0], y: getYScale(), z: datum.coords[2]}}
           />  
        );


    }
  
  }

}

export default Branches;
 
