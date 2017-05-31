import canUseDOM from "can-use-dom";
import React, { Component } from 'react';
import base from '../rebase';
import {Directions, Map, MapAndDirections} from './GoogleMapsApi';
import UserMenu from './UserMenu'
import LocationDetails from './LocationDetails';

let google;
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
  constructor (props){
    super(props);
    this.state = {
      tour: [],
      startTour: false,
      origin: null,
      destination: null,
      locations:[],
      travelMode: 'WALKING',
      modal: false,
      tourLeg:{},
      startNewLeg: true
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
              //console.log('site:',site)
              //siteInfoWithLatLng = {...siteInfo, lat: siteInfo.location.latitude, lng: siteInfo.location.longitude}
              siteInfoWithLatLng = {
                ...siteInfo,
                latlng: {lat: siteInfo.location.latitude, lng: siteInfo.location.longitude},
                locationId: site
              }
              console.log('siteInfoWithLatLng', siteInfoWithLatLng)
              newLocations = this.state.locations.concat(siteInfoWithLatLng)
              // console.log('siteInfo:',siteInfo)
              console.log('newLocations:', newLocations)
              this.setState({
                locations: newLocations,
                destination: this.state.locations[0]
              })
            }
          })
          console.log('site:',site);
        })
      }
    });

    this.setUpTourLeg()

  }

  displayTravelModes(){
    console.log('this.state.locations:',this.state.locations)
    console.log('this.state.destination:',this.state.destination)
    return(
      <form>
        <UserMenu />
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
    //console.log('indexOf destination:',this.state.tour.sites.indexOf(this.state.destination.locationId))

    return (
      <div className="startTour">
        {/* <button onClick={() => this.setState({origin:{lat: 40.7128, lng: -74.005}})}>New York</button> */}
        {this.displayTravelModes()}
        {/* <MapAndDirections lat={this.state.origin.lat} lng={this.state.origin.lng}/> */}
        <MapAndDirections start={ this.state.origin } end={ this.state.destination.address } mode={ this.state.travelMode }/>
        <button className="waves-effect waves-light btn" onClick={()=>{this.setState({modal: true})}}>
          <i className="material-icons" aria-hidden="true">location_on</i> I'm Here
        </button>
      </div>
    )
  }

  tourInfo(){
    return (
      <div className="tourInfo">
        <UserMenu />
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

  setUpTourLeg(){
    if(this.state.destination){
      let tourLegPosition, backToStartLocation, backToStartButton, nextLocation, nextButton, previousLocation, previousButton
      console.log('destination exists!');
      console.log('indexOf destination:',this.state.tour.sites.indexOf(this.state.destination.locationId));
      tourLegPosition = this.state.tour.sites.indexOf(this.state.destination.locationId);
      backToStartLocation = this.state.locations[0];
      if (tourLegPosition === 0){
        backToStartButton = false
      }else { backToStartButton = true}

      nextLocation = this.state.locations[tourLegPosition+1];
      if (nextLocation){
        nextButton = true
      } else { nextButton = false}
      console.log('nextLocation',nextLocation)

      previousLocation = this.state.locations[tourLegPosition-1];
      if (previousLocation){
        previousButton = true
      } else { previousButton = false}
      console.log('previousLocation',previousLocation)

      this.setState({
        tourLeg: {
          tourLegPosition:tourLegPosition,
          backToStartLocation: backToStartLocation,
          backToStartButton: backToStartButton,
          nextLocation: nextLocation,
          nextButton: nextButton,
          previousLocation: previousLocation,
          previousButton: previousButton
        },
        startNewLeg: false
      })
    } else {
      console.log('destination does not exist')
    }
  }

  startTourLeg(tourLegButtonPressed){
    let newDestination={};
    console.log('startTourLeg',tourLegButtonPressed);
    if (tourLegButtonPressed === 'previous'){
      newDestination = this.state.tourLeg.previousLocation;
    } else if (tourLegButtonPressed === 'next'){
      newDestination = this.state.tourLeg.nextLocation;
    } else {
      newDestination = this.state.tourLeg.backToStartLocation;
    }
    console.log('newDestination:', newDestination)
    this.setState({
      destination : newDestination,
      modal: !this.state.modal,
      startNewLeg: true
    })
  }

  render() {
    console.log('this.props.match.params:',this.props.match.params)
    console.log('this.state.tour:',this.state.tour)
    console.log('this.state.origin:',this.state.origin)
    console.log('this.state.locations:',this.state.locations)
    console.log('this.state:',this.state)
    return (
      <div className="Tour">
        {!this.state.startTour && this.tourInfo()}
        {this.state.startTour && this.startTour()}
        {this.state.startNewLeg && this.setUpTourLeg()}
        <LocationDetails sendBackModalChange = {this.startTourLeg.bind(this)} locationInfo = {this.state.destination} modal = {this.state.modal} tourLeg={this.state.tourLeg}/>
      </div>
    )
  }
}

export default Tour;
