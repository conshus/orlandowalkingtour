import React, { Component } from 'react';
import materializecss from 'materialize-css';
//import $ from 'jquery';
var $ = window.jQuery = require('jquery');
window.Vel = require('materialize-css/js/velocity.min'); //needed this to make the sideNav open. found solution here: https://github.com/Dogfalo/materialize/issues/1229#issuecomment-242328892

class UserMenu extends Component {
  componentDidMount(){
    window.$ = window.jQuery;
    $('.button-collapse').sideNav();
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
                <li><a href="sass.html">Sass</a></li>
                <li><a href="badges.html">Components</a></li>
                <li><a href="collapsible.html">Javascript</a></li>
                <li><a href="mobile.html">Mobile</a></li>
              </ul>
              <ul className="side-nav" id="mobile-demo">
                <li><a href="sass.html">Sass</a></li>
                <li><a href="badges.html">Components</a></li>
                <li><a href="collapsible.html">Javascript</a></li>
                <li><a href="mobile.html">Mobile</a></li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    )
  }
}

export default UserMenu;
