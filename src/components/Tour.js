import canUseDOM from "can-use-dom";
import React, { Component } from 'react';
import base from '../rebase';
import {Directions, Map, MapAndDirections} from './GoogleMapsApi';

//Get current location
const geolocation = (
  canUseDOM && navigator.geolocation ?
  navigator.geolocation :
  ({
    getCurrentPosition(success, failure) {
      failure(`Your browser doesn't support geolocation.`);
    },
  })
);

class Tour extends Component {
  constructor (){
    super();
    this.state = {
      tour: [],
      startTour: false,
      origin: null,
      destination: null,
      locations:[],
      travelMode: 'WALKING'
    }
  }
  componentDidMount(){
    geolocation.getCurrentPosition((position) => {
      this.setState({
        origin: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        //locations: this.state.origin
      })
    })

    base.bindToState(`/tours/${this.props.match.params.tourId}`, {
      context: this,
      state: 'tour',
      asArray: false,
    })
    let newLocations;
    let siteInfoWithLatLng;
    base.fetch(`/tours/${this.props.match.params.tourId}/sites`,{
      context: this,
      asArray: true,
      then(sites){
        console.log('fetch response:', sites)
        sites.map(site => {
          base.fetch(`/historic-locations/orlando/${site}/`,{
            context: this,
            asArray: false,
            then(siteInfo){
              //siteInfoWithLatLng = {...siteInfo, lat: siteInfo.location.latitude, lng: siteInfo.location.longitude}
              siteInfoWithLatLng = {
                ...siteInfo,
                latlng: {lat: siteInfo.location.latitude, lng: siteInfo.location.longitude}
              }
              console.log('siteInfoWithLatLng', siteInfoWithLatLng)
              newLocations = this.state.locations.concat(siteInfoWithLatLng)
              // console.log('siteInfo:',siteInfo)
              console.log('newLocations:', newLocations)
              this.setState({
                locations: newLocations
              })
            }
          })
          console.log('site:',site);
        })
      }
    });
  }

  displayTravelModes(){
    console.log('this.state.locations:',this.state.locations)
    return(
      <form>
        Mode of Travel: 
        <span onClick={() => this.setState({travelMode:'WALKING'})}>
          <input name="travelMode" type="radio" id="walk" checked={this.state.travelMode==="WALKING" ? 'checked' : '' }/>
          <label htmlFor="walk">Walk</label>
        </span>
        <span onClick={() => this.setState({travelMode:'BICYCLING'})}>
          <input name="travelMode" type="radio" id="bicycle" checked={this.state.travelMode==="BICYCLING" ? 'checked' : '' }/>
          <label htmlFor="bicycle">Bicycle</label>
        </span>
        <span onClick={() => this.setState({travelMode:'DRIVING'})}>
          <input name="travelMode" type="radio" id="drive" checked={this.state.travelMode==="DRIVING" ? 'checked' : '' }/>
          <label htmlFor="drive">Drive</label>
        </span>
      </form>
    )
  }

  startTour(){
    console.log('this.state.tour.sites:',this.state.tour.sites)
    console.log('this.state.locations:',this.state.locations)
    return (
      <div className="startTour">
        {/* <button onClick={() => this.setState({origin:{lat: 40.7128, lng: -74.005}})}>New York</button> */}
        {this.displayTravelModes()}
        {/* <MapAndDirections lat={this.state.origin.lat} lng={this.state.origin.lng}/> */}
        <MapAndDirections start={ this.state.origin } end={ this.state.locations[0].address } mode={ this.state.travelMode }/>
      </div>
    )
  }

  tourInfo(){
    return (
      <div className="tourInfo">
        <h1>{this.state.tour.tourName}</h1>
        <h6>
          by <img className="responsive-img circle userAvatar" src={this.state.tour.creatorPhoto} alt="user pic" />
          {this.state.tour.creator}
        </h6>
        {this.state.origin ?
        <button className="waves-effect waves-light btn" onClick={()=>{this.setState({startTour: true})}}>
          <i className="material-icons" aria-hidden="true">directions_walk</i> Start Tour
        </button>
        : <div><i className="fa fa-spinner fa-spin fa-3x fa-fw"></i><span className="sr-only">Getting Current Location</span><b>Getting Current Location</b></div>}
      </div>
    )
  }
  render() {
    console.log('this.props.match.params:',this.props.match.params)
    console.log('this.state.tour:',this.state.tour)
    console.log('this.state.origin:',this.state.origin)
    console.log('this.state.locations:',this.state.locations[0])
    return (
      <div className="Tour">
        {!this.state.startTour && this.tourInfo()}
        {this.state.startTour && this.startTour()}
      </div>
    )
  }
}

export default Tour;
