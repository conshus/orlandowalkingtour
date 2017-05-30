/* eslint-disable no-undef */ //found this here: https://github.com/tomchentw/react-google-maps/issues/414#issuecomment-280883424
/* global google */ //for google is not defined error: used in examples here https://tomchentw.github.io/react-google-maps/
import React, { Component } from 'react';

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
    console.log('getMapAndDirections',start,end)
    this.map = new google.maps.Map( this.refs.map, {
      // center: { lat: this.props.lat, lng: this.props.lng },
      center: start,
      zoom: 8
    });

    document.getElementById('directionsPanel').innerHTML = '';
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(this.map);
    directionsDisplay.setPanel(this.refs.directionsPanel);

    var request = {
      // origin: { lat: start.lat, lng: start.lng },
      // destination:  { lat: end.lat, lng: end.lng },
      origin: start,
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
    console.log('componentDidMount',this.props.start)
    // this.getMapAndDirections({ lat: this.props.start.lat, lng: this.props.start.lng }, 'tampa, fl', 'DRIVING');
    this.getMapAndDirections(this.props.start, this.props.end, this.props.mode);
  }

  shouldComponentUpdate(){
    return false;
  }

  componentWillReceiveProps(nextProps){
    document.getElementById('directionsPanel').innerHTML = '';

    console.log('nextProps:', nextProps)
    // let newStartSite = nextProps.start
    // console.log('newStartSite:', newStartSite)
    // this.setState({
    //   startSite: newStartSite
    // })
    this.getMapAndDirections(nextProps.start, nextProps.end, nextProps.mode);
    //this.getMapAndDirections(this.state.startSite, 'tallahassee, fl', 'DRIVING');
    console.log('this.props.start:',this.props.start)
  }

  render(){
    return(
      <div className="MapAndDirections row">
        <div className="col s12 m6" style={{padding:0}}>
          <div id="map" ref="map" />
        </div>
        <div className="col s12 m6" id="panelContainer" style={{padding:0}}>
          <div id="directionsPanel" ref="directionsPanel" />
        </div>
      </div>
    )
  }

}
