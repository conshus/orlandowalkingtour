/* eslint-disable no-undef */ //found this here: https://github.com/tomchentw/react-google-maps/issues/414#issuecomment-280883424
/* global google */ //for google is not defined error: used in examples here https://tomchentw.github.io/react-google-maps/
import React, { Component } from 'react';
import axios from 'axios';


class Directions extends Component {
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
    this.map = new google.maps.Map( this.refs.map, {
      center: { lat: this.props.lat, lng: this.props.lng},
      zoom: 8
    });
  }

  shouldComponentUpdate(){
    return false;
  }



  render(){
    return(
      <div id="map" ref="map" />
    )
  }

}

export default Directions;
