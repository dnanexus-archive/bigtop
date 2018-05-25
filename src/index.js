import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './App';

class VRScene extends Component {
  render () {
    return (
      <App />
    );
  }
}

ReactDOM.render(<VRScene/>, document.querySelector('#root'));
