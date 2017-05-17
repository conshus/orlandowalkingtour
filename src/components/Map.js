import canUseDOM from "can-use-dom";
//import raf from "raf";
import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, Circle, InfoWindow, } from 'react-google-maps';
import base from '../rebase';
window.base = base; //Use base from console

const geolocation = (
  canUseDOM && navigator.geolocation ?
  navigator.geolocation :
  ({
    getCurrentPosition(success, failure) {
      failure(`Your browser doesn't support geolocation.`);
    },
  })
);

class Map extends Component {
  state = {
    center: null,
    content: null,
    radius: 6000,
  };
componentDidMount() {

  base.auth().onAuthStateChanged(user => {
    if (user) {
      console.log('User is signed in.', user);
      this.setState({
        user: user
      })
     }
  });


  geolocation.getCurrentPosition((position) => {
    // if (this.isUnmounted) {
    //   return;
    // }
    this.setState({
      center: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
      content: '<img src='+this.state.user.photoURL+'>Location found using HTML5.',
    });

    //raf(tick);
  }, (reason) => {
    // if (this.isUnmounted) {
    //   return;
    // }
    this.setState({
      center: {
        lat: 60,
        lng: 105,
      },
      content: `Error: The Geolocation service failed (${reason}).`,
    });
  });
}




  render(){
    const markers = this.props.markers || []
    console.log(markers)
    {console.log(this.state.center)}
    return (
      <GoogleMap
        defaultZoom={14}
        //defaultCenter={{ lat: -25.363882, lng: 131.044922 }}>
        center={this.state.center}>
        {this.state.center && (
        <InfoWindow position={this.state.center}>
          <div>{this.state.content}</div>
        </InfoWindow>
        )}
        {markers.map((marker,index) => (
            <Marker {...marker} />
          )
        )}
      </GoogleMap>
    )
  }
}
export default withGoogleMap(Map);
