import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import SampleComponent from '../SampleComponent/SampleComponent.js';

class App extends Component {
  componentDidMount(){
    axios.get('/test')
    .then((response)=>{
      console.log(response.data);
    })
  }

  render (){
    return (
      <div className="App">
        <h1>Hello World!</h1>
        <SampleComponent />
      </div>
    )
  }
}

export default App;
