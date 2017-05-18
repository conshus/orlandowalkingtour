import React, { Component } from 'react';
import materializecss from 'materialize-css';
//import $ from 'jquery';
var $ = window.jQuery = require('jquery');
window.Vel = require('materialize-css/js/velocity.min'); //needed this to make the sideNav open. found solution here: https://github.com/Dogfalo/materialize/issues/1229#issuecomment-242328892

class Locations extends Component {

  constructor (){
    super();
    this.state = {
      tourLocations:[],
    }
  }

  componentDidMount(){
    window.$ = window.jQuery;
    $('ul.tabs').tabs();
    $('.moreInfo').sideNav();
    console.log('componentDidMount')
  }

  toggleSelect(locationToggled){
    console.log('location toggleSelect:',location);
    let newLocationsArray;
    let locationBeingChecked = this.state.tourLocations.find(function(location){
      return location.key === locationToggled.key
    })
    console.log(locationBeingChecked)
    if (locationBeingChecked){
      console.log('already in list, needs to be removed')
      newLocationsArray = this.state.tourLocations.filter(function(location, index){
        if (location !== locationToggled){
          return(location)
        }
      })
    } else {
      newLocationsArray = this.state.tourLocations.concat(locationToggled)
    }
    this.setState({
      tourLocations: newLocationsArray
    })
  }

  displayAllLocations(){
    return(
      <div>
        <div id="allLocations" className="col s12">
          <ul className="collection">
            <form action="#">
              {this.props.locations.map((location, index) => {
                return(
                  <li className="collection-item" key={location.key}><div><input className="left" type="checkbox" id={location.key} /><label onClick={this.toggleSelect.bind(this,location)} htmlFor={location.key}>{location.name}</label><a href="#" data-activates="moreInfoSlideOut" className="secondary-content moreInfo"><i className="material-icons">info_outline</i></a></div></li>
                )
              })}
            </form>
          </ul>
        </div>
      </div>
    )
  }
  displaySelectedLocations(){
    return(
      <div>
        <div id="selectedLocations" className="col s12">
          Selected Locations
          <a href="#" data-activates="moreInfoSlideOut" className="moreInfo"><i className="material-icons">menu</i></a>
          <ul className="collection">
            <form action="#">
              {this.state.tourLocations.map((location, index) => {
                return(
                  <li className="collection-item" key={location.key}><div><input className="left" type="checkbox" id={location.key} checked="checked" /><label onClick={this.toggleSelect.bind(this,location)} htmlFor={location.key}>{location.name}</label><a href="#" data-activates="moreInfoSlideOut" className="secondary-content moreInfo"><i className="material-icons">info_outline</i></a></div></li>
                )
              })}
            </form>
          </ul>
        </div>
      </div>
    )
  }
  render() {
    console.log(this.props.locations)
    console.log(this.state.tourLocations)

    return (
      <div className="Locations">
        <div className="row">
          <div className="col s12">
            <ul className="tabs tabs-fixed-width">
              <li className="tab col s3"><a className="active" href="#allLocations">All Locations</a></li>
              <li className="tab col s3"><a href="#selectedLocations">Selected Locations</a></li>
            </ul>
          </div>
          {this.displayAllLocations()}
          {this.displaySelectedLocations()}
        </div>

        <ul id="moreInfoSlideOut" className="side-nav">
          <li><div className="userView">
            <div className="background">
              <img src="images/office.jpg" />
            </div>
            <a href="#!user"><img className="circle" src="images/yuna.jpg"/></a>
            <a href="#!name"><span className="white-text name">John Doe</span></a>
            <a href="#!email"><span className="white-text email">jdandturk@gmail.com</span></a>
          </div></li>
          <li><a href="#!"><i className="material-icons">cloud</i>First Link With Icon</a></li>
          <li><a href="#!">Second Link</a></li>
          <li><div className="divider"></div></li>
          <li><a className="subheader">Subheader</a></li>
          <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
        </ul>


      </div>
    )
  }
}

export default Locations;
