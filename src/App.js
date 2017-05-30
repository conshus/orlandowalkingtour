import React, { Component } from 'react';
import Home from './components/Home';
import Tours from './components/Tours';
import CreateTour from './components/CreateTour';
import Tour from './components/Tour';
import UserTours from './components/UserTours';
import SuggestALocation from './components/SuggestALocation';
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
            <Route path="/tour/:tourId"  render={(defaultProps) =>  <Tour {...defaultProps}/>} />
            <Route path="/user/:uid/create" component={CreateTour}/>
            <Route path="/user/:uid/tours" component={UserTours}/>
            <Route path="/user/:uid/suggestALocation" component={SuggestALocation}/>
          </div>
        </Router>

      </div>
    );
  }
}

export default App;
