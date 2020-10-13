import React, { Component } from 'react';
import './App.css';
import Home from './Containers/Home'

import {
  BrowserRouter,
  // Switch,
  // Route,
  // Link,
  // useHistory
} from "react-router-dom";


class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
        <Home />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;