import canUseDOM from "can-use-dom";
import React, { Component } from 'react';
import base from '../rebase'
import Map from './Map';
import Directions from './Directions'
import { withGoogleMap, GoogleMap, Marker, Circle, InfoWindow, DirectionsRenderer, InfoBox} from 'react-google-maps';

var google;

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
    base.bindToState(`/tours/${this.props.match.params.tourId}`, {
      context: this,
      state: 'tour',
      asArray: false,
      then(response){
        console.log(response)
      }
    });

    geolocation.getCurrentPosition((position) => {
      this.setState({
        origin: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        locations: this.state.origin
      })
    })

    // const DirectionsService = new google.maps.DirectionsService();
    //
    // DirectionsService.route({
    //   origin: this.state.origin,
    //   destination: this.state.destination,
    //   travelMode: google.maps.TravelMode.DRIVING,
    // }, (result, status) => {
    //   if (status === google.maps.DirectionsStatus.OK) {
    //     this.setState({
    //       directions: result,
    //     });
    //   } else {
    //     console.error(`error fetching directions ${result}`);
    //   }
    // });


  }
  startTour(){
    console.log(this.state.tour.sites)
    console.log(this.state.locations)
    return (
      <div className="startTour">
        <div className="row">
          <div className="col s12 m6" style={{padding:0}}>
            Map
            {/* <Map
              locations={this.state.mapLocations}
              containerElement={<div id='containerElement' />}
              mapElement={<div id='mapElement' />}
            /> */}
          </div>
          <div className="col s12 m6">
            Your Location
            Directions
            Destination
            <Directions lat={-34.397} lng={150.644}/>

            {/* <Locations
              locations={this.state.locations}
              allLocations={this.state.allLocations}
              sendLocationToggleToCreateTour={this.toggleLocation.bind(this)}
              switchLocationState={this.switchLocationState.bind(this)}
            /> */}
          </div>
        </div>
      </div>
    )
  }
  tourInfo(){
    return (
      <div className="tourInfo">
        <h1>{this.state.tour.tourName}</h1>
        <h6>by <img className="responsive-img circle userAvatar" src={this.state.tour.creatorPhoto} alt="user pic" />{this.state.tour.creator}</h6>
        <button className="waves-effect waves-light btn" onClick={()=>{this.setState({startTour: true})}}><i className="material-icons" aria-hidden="true">directions_walk</i> Start Tour</button>
      </div>
    )
  }
  render() {
    console.log(this.props.match.params)
    console.log(this.state.tour)
    console.log(this.state.origin)
    return (
      <div className="Tour">
        {!this.state.startTour && this.tourInfo()}
        {this.state.startTour && this.startTour()}
      </div>
    )
  }
}

export default Tour;
