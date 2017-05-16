import React, { Component } from 'react';
import Home from './Home';
import Tours from './Tours';
import CreateTour from './CreateTour';
import Tour from './Tour';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path="/" component={Home}/>
            <Route path="/tours" component={Tours}/>
            <Route path="/user/:uid/create" component={CreateTour}/>
            <Route path="/tour/:id" component={Tour}/>
          </div>
        </Router>

      </div>
    );
  }
}

export default App;
