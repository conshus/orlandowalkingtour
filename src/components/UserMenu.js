import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import materializecss from 'materialize-css';
//import $ from 'jquery';
var $ = window.jQuery = require('jquery');
window.Vel = require('materialize-css/js/velocity.min'); //needed this to make the sideNav open. found solution here: https://github.com/Dogfalo/materialize/issues/1229#issuecomment-242328892
import base from '../rebase';


class UserMenu extends Component {
  constructor(){
    super();
    this.state = {
      user:{}
    }
  }
  componentDidMount(){
    window.$ = window.jQuery;
    $('.button-collapse').sideNav();
    base.auth().onAuthStateChanged(user => {
      if (user){
        console.log(user)
        this.setState({
          user: user
        })
      }
    })
  }

  loggedInUserOptions(){
    return(
      <span>
        <li><Link to={`/user/${this.state.user.uid}/create`}>Create a Tour</Link></li>
        <li><Link to={`/user/${this.state.user.uid}/tours`}>View Saved Tours</Link></li>
        <li><Link to={`/user/${this.state.user.uid}/suggestALocation`}>Suggest A Location</Link></li>
      </span>
    )
  }
  render() {
    return (
      <div className="UserMenu">
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper">
              <a href="#!" className="brand-logo">Logo</a>
              <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
              <ul className="right hide-on-med-and-down">
                <li><Link to="/">Home</Link></li>
                {this.state.user.uid && this.loggedInUserOptions()}
                {/* <li><Link to="/create">Create a Tour</Link></li>
                <li><Link to="/tours">View Saved Tours</Link></li>
                <li><Link to="/suggest">Suggest A Location</Link></li> */}
              </ul>
              <ul className="side-nav" id="mobile-demo">
                <li><Link to="/">Home</Link></li>
                {this.state.user.uid && this.loggedInUserOptions()}
                {/* <li><Link to="/create">Create a Tour</Link></li>
                <li><Link to="/tours">View Saved Tours</Link></li>
                <li><Link to="/suggest">Suggest A Location</Link></li> */}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    )
  }
}

export default UserMenu;
