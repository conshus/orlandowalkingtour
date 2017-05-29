/* eslint-disable no-undef */ //found this here: https://github.com/tomchentw/react-google-maps/issues/414#issuecomment-280883424
/* global google */ //for google is not defined error: used in examples here https://tomchentw.github.io/react-google-maps/
import React, { Component } from 'react';
//import axios from 'axios';

export class Map extends Component {

  shouldComponentUpdate(){
    return false;
  }

  componentWillReceiveProps(nextProps){
    this.map.panTo({ lat: nextProps.lat, lng: nextProps.lng })
  }

  componentDidMount(){
    this.map = new google.maps.Map( this.refs.map, {
      center: { lat: this.props.lat, lng: this.props.lng },
      zoom: 8
    });
  }

  render(){
    return(
      <div id="map" ref="map" />
    )
  }

}

export class MapAndDirections extends Component {

  getMapAndDirections(start,end,mode){
    this.map = new google.maps.Map( this.refs.map, {
      center: { lat: this.props.lat, lng: this.props.lng },
      zoom: 8
    });

    document.getElementById('directionsPanel').innerHTML = '';
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(this.map);
    directionsDisplay.setPanel(this.refs.directionsPanel);

    var request = {
      origin: { lat: start.lat, lng: start.lng },
      destination: end,
      travelMode: mode
    };
    directionsService.route(request, function(response, status) {
      if (status == 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        console.log('Directions request failed due to ', status)
      }
    });
  }

  componentDidMount(){
    this.getMapAndDirections({ lat: this.props.lat, lng: this.props.lng }, 'tampa, fl', 'DRIVING');
  }

  shouldComponentUpdate(){
    return false;
  }

  componentWillReceiveProps(nextProps){
    console.log('nextProps:', nextProps)
    this.getMapAndDirections({ lat: nextProps.lat, lng: nextProps.lng }, 'tallahassee, fl', 'DRIVING');
  }

  render(){
    return(
      <div className="MapAndDirections row">
        <div className="col s12 m6" style={{padding:0}}>
          <div id="map" ref="map" />
        </div>
        <div className="col s12 m6" style={{padding:0}}>
          <div id="directionsPanel" ref="directionsPanel" />
        </div>
      </div>
    )
  }

}
