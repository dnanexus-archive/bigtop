import 'aframe';
import 'aframe-particle-system-component';
import {Entity} from 'aframe-react';
import React, {Component} from 'react';
import Branches from 'components/atoms/Branches';
import * as R from 'ramda';

class Forest extends Component {
  render() {
    const {
      data,
      height
    } = this.props;

    console.log(data)

    let forest = R.map(function(d) {
      return (<Branches key={d.id} datum={d} />) 
    }, data);

    return (
      <Entity>
        {forest}
      </Entity>
    );  
  }
}

export default Forest;
