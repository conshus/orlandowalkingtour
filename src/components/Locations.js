import React, { Component } from 'react';
import materializecss from 'materialize-css';
//import $ from 'jquery';
var $ = window.jQuery = require('jquery');
window.Vel = require('materialize-css/js/velocity.min'); //needed this to make the sideNav open. found solution here: https://github.com/Dogfalo/materialize/issues/1229#issuecomment-242328892
import base from '../rebase';
window.base = base; //Use base from console

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
    // console.log('componentDidMount');

    base.auth().onAuthStateChanged(user => {
      if (user) {
        // console.log('User is signed in.', user);
        this.setState({
          user: user
        })
       }
    });
  }


  saveTour(){
    let tourName = this.tourName.value;
    console.log(tourName)
    let tourLocationIdsOnly = this.state.tourLocations.map((location,index)=>location.key);
    console.log(tourLocationIdsOnly)
    base.push(`/tours/`,
    { data: {creator: this.state.user.displayName, creatorId: this.state.user.uid, tourName: tourName, sites: tourLocationIdsOnly}})
    // .then(results => {
    //   base.push(`/tours/${results.key}/sites`,
    //   {data: this.state.tourLocations})

    // }
  //)

  }


  toggleSelect(locationToggled){
    console.log('location toggleSelect:',locationToggled);
    this.props.sendLocationToggleToCreateTour(locationToggled);
    let newTourLocationsArray;
    let locationBeingChecked = this.state.tourLocations.find(function(location){
      return location.key === locationToggled.key
    })
    console.log(locationBeingChecked)
    if (locationBeingChecked){
      console.log('already in list, needs to be removed')
      newTourLocationsArray = this.state.tourLocations.filter(function(location, index){
        if (location !== locationToggled){
          return(location)
        }
      })
    } else {
      newTourLocationsArray = this.state.tourLocations.concat(locationToggled)
    }
    this.setState({
      tourLocations: newTourLocationsArray
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
                  <li className="collection-item" key={location.key}>
                    <div>
                      {/* <input className="left" type="checkbox" id={location.key} onClick={this.toggleSelect.bind(this,location)}  /> */}
                      <input className="left" type="checkbox" id={location.key} onClick={this.toggleSelect.bind(this,location)}  checked={location.selected ? 'checked' : ''} />
                      <label htmlFor={location.key}>
                        {location.name}
                      </label>
                      <a href="#" data-activates="moreInfoSlideOut" className="secondary-content moreInfo">
                        <i className="material-icons">info_outline</i>
                      </a>
                    </div>
                  </li>
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
          <div className="input-field">
          <input id="tourName" type="text" className="validate"  ref={(input) => { this.tourName = input; }} />
          <label htmlFor="tourName">Enter a name for your tour</label>
        </div>
          <button className="waves-effect waves-light btn"
            onClick={this.saveTour.bind(this)}>Save</button>
          <a href="#" data-activates="moreInfoSlideOut" className="moreInfo"><i className="material-icons">menu</i></a>
          <ul className="collection">
            <form action="#">
              {this.state.tourLocations.map((location, index) => {
                return(
                  <li className="collection-item" key={location.key}>
                    <div>
                      <input className="left" type="checkbox" id={'selected-'+location.key} checked="checked" />
                      <label onClick={this.toggleSelect.bind(this,location)} htmlFor={'selected-'+location.key}>
                        {location.name}
                      </label>
                      <a href="#" data-activates="moreInfoSlideOut" className="secondary-content moreInfo">
                        <i className="material-icons">
                          info_outline
                        </i>
                      </a>
                    </div>
                  </li>
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
