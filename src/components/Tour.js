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
      locations:[]
    }
  }
  componentDidMount(){
    geolocation.getCurrentPosition((position) => {
      this.setState({
        origin: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        locations: this.state.origin
      })
    })

    base.bindToState(`/tours/${this.props.match.params.tourId}`, {
      context: this,
      state: 'tour',
      asArray: false,
      // then(response){
      //   console.log('bind to state',response)
      // }
    }).then(response => {
            console.log('bind to state',response)
          });


  }

  startTour(){
    console.log('this.state.tour.sites:',this.state.tour.sites)
    console.log('this.state.locations:',this.state.locations)
    return (
      <div className="startTour">
        <button onClick={() => this.setState({origin:{lat: 40.7128, lng: -74.005}})}>New York</button>
        <MapAndDirections lat={this.state.origin.lat} lng={this.state.origin.lng}/>
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
        <button className="waves-effect waves-light btn" onClick={()=>{this.setState({startTour: true})}}>
          <i className="material-icons" aria-hidden="true">directions_walk</i> Start Tour
        </button>
      </div>
    )
  }
  render() {
    console.log('this.props.match.params:',this.props.match.params)
    console.log('this.state.tour:',this.state.tour)
    console.log('this.state.origin:',this.state.origin)
    return (
      <div className="Tour">
        {!this.state.startTour && this.tourInfo()}
        {this.state.startTour && this.startTour()}
      </div>
    )
  }
}

export default Tour;
