import React, { Component } from 'react';
import materializecss from 'materialize-css';
//import $ from 'jquery';
var $ = window.jQuery = require('jquery');

class Locations extends Component {
  componentDidMount(){
    window.$ = window.jQuery;
    $('ul.tabs').tabs();
  }
  render() {
    return (
      <div className="Locations">
        <div className="row">
          <div className="col s12">
            <ul className="tabs tabs-fixed-width">
              <li className="tab col s3"><a className="active" href="#test1">All Locations</a></li>
              <li className="tab col s3"><a href="#test2">Selected Locations</a></li>
            </ul>
          </div>
          <div id="test1" className="col s12">List of all locations</div>
          <div id="test2" className="col s12">Selected Locations</div>
        </div>
      </div>
    )
  }
}

export default Locations;
