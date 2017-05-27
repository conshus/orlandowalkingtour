/* eslint-disable no-undef */ //found this here: https://github.com/tomchentw/react-google-maps/issues/414#issuecomment-280883424
/* global google */ //for google is not defined error: used in examples here https://tomchentw.github.io/react-google-maps/
import React, { Component } from 'react';
import axios from 'axios';


export class Map extends Component {
  constructor(){
    super();
    this.state = {

    }
  }

  shouldComponentUpdate(){
    return false;
  }

  componentWillReceiveProps(nextProps){
    this.map.panTo({ lat: nextProps.lat, lng: nextProps.lng})
  }

  componentDidMount(){
    // axios.get('https://crossorigin.me/https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key=AIzaSyBs6d9RlcvwZc1RfezhN4XO2rx8EbGzEfU')
    // //.then(response => console.log(response) );
    // .then(response => {
    //   console.log(response)
    // });
    this.map = new google.maps.Map( this.refs.map, {
      center: { lat: this.props.lat, lng: this.props.lng},
      zoom: 8
    });


  }



  render(){
    return(
      <div id="map" ref="map" />
    )
  }

}

//export default Map;

export class Directions extends Component {
  constructor(){
    super();
    this.state = {

    }
  }
  componentDidMount(){
    // axios.get('https://crossorigin.me/https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key=AIzaSyBs6d9RlcvwZc1RfezhN4XO2rx8EbGzEfU')
    // //.then(response => console.log(response) );
    // .then(response => {
    //   console.log(response)
    // });
    // this.map = new google.maps.Map( this.refs.map, {
    //   center: { lat: this.props.lat, lng: this.props.lng},
    //   zoom: 8
    // });


    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setPanel(this.refs.directionsPanel);

      var request = {
        origin:'orlando, fl',
        destination:'tampa, fl',
        travelMode: 'DRIVING'
      };
      directionsService.route(request, function(response, status) {
        if (status == 'OK') {
          directionsDisplay.setDirections(response);
        }
      });

  }

  shouldComponentUpdate(){
    return false;
  }



  render(){
    return(
      <div id="directionsPanel" ref="directionsPanel" />
    )
  }

}

//export class Directions;
