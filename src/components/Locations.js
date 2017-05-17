import React, { Component } from 'react';
import materializecss from 'materialize-css';
//import $ from 'jquery';
var $ = window.jQuery = require('jquery');

class Locations extends Component {
  componentDidMount(){
    window.$ = window.jQuery;
    $('ul.tabs').tabs();
  }
  displayAllLocations(){
    return(
      <div>
        <div id="allLocations" className="col s12">
          <ul className="collection">
            {this.props.locations.map((location, index) => {
              return(
                <li className="collection-item" key={index}><div>{location.name}<a href="#" className="secondary-content"><i className="material-icons">send</i></a></div></li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
  render() {
    console.log(this.props.locations)
    return (
      <div className="Locations">
        <div className="row">
          <div className="col s12">
            <ul className="tabs tabs-fixed-width">
              <li className="tab col s3"><a className="active" href="#allLocations">All Locations</a></li>
              <li className="tab col s3"><a href="#test2">Selected Locations</a></li>
            </ul>
          </div>
          {this.displayAllLocations()}
          <div id="test2" className="col s12">Selected Locations</div>
        </div>
      </div>
    )
  }
}

export default Locations;
