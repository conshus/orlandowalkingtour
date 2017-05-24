import canUseDOM from "can-use-dom";
//import raf from "raf";
import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, Circle, InfoWindow, } from 'react-google-maps';
import base from '../rebase';
window.base = base; //Use base from console
import Distance from './Distance'

// var distance = require('google-distance');
// distance.get(
//   {
//     origin: 'San Francisco, CA',
//     destination: 'San Diego, CA'
//   },
//   function(err, data) {
//     if (err) return console.log(err);
//     console.log(data);
// });

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
    markers: [],
    travelMode: 'walking'
  };

componentDidMount() {

  base.auth().onAuthStateChanged(user => {
    if (user) {
      // console.log('User is signed in.', user);
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
      content: 'Location found using HTML5.',
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

  componentWillReceiveProps(newProps){

    // var geocoder = new google.maps.Geocoder;
    //
    // var service = new google.maps.DistanceMatrixService;

    console.log(newProps.locations)
    // let newMarkers = newProps.locations.map((marker,index) => (
    //     {position: new.google.maps.LatLng(marker.location.latitude, marker.location.longitude)}
    // ))

    this.setState({
      markers: newProps.locations.map(marker => {
        //console.log(marker.location)
        return {
          position: {lat:marker.location.latitude, lng:marker.location.longitude},
          infoContent: (marker.name) ,
          showInfo: false
        }
      })
    })
    console.log(this.state.markers)
  }

  handleMarkerClick = this.handleMarkerClick.bind(this);
  handleMarkerClose = this.handleMarkerClose.bind(this);

  // Toggle to 'true' to show InfoWindow and re-renders component
  handleMarkerClick(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: true,
          };
        }
        return marker;
      }),
    });
  }

  handleMarkerClose(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: false,
          };
        }
        return marker;
      }),
    });
  }

  render(){
    const markers = this.state.markers || []
    // console.log(markers)
    // {console.log(this.state.center)}
    return (
      <GoogleMap
        defaultZoom={14}
        //defaultCenter={{ lat: -25.363882, lng: 131.044922 }}>
        center={this.state.center}>
        {this.state.center && (
        <InfoWindow position={this.state.center}>
          {/* <div><b>test</b>{this.state.content}</div> */}
          <img className="responsive-img circle userAvatar" src={this.state.user.photoURL} alt="user pic" />
        </InfoWindow>
        )}
        {markers.map((marker,index) => (
            <Marker
              key={index}
              position={marker.position}
               //{...marker}
              onClick={this.handleMarkerClick.bind(this,marker)}
            >
              {marker.showInfo && (
                <InfoWindow onCloseClick={this.handleMarkerClose.bind(this,marker)}>
                  <div>
                    {marker.infoContent}
                    <br/>
                    <h6><Distance origin={this.state.center} destination={marker.position} travelMode={this.state.travelMode} showDistance='true' showDuration='true' >Loading</Distance></h6>
                  </div>
                </InfoWindow>
              )}
          </Marker>
          )
        )}
      </GoogleMap>
    )
  }
}
export default withGoogleMap(Map);
