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

//Have to move outside the loop, otherwise the directions will be printed twice
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
directionsDisplay = new google.maps.DirectionsRenderer();

export class MapAndDirections extends Component {

  getMapAndDirections(start,end,mode){
    console.log('getMapAndDirections',start,end)
    this.map = new google.maps.Map( this.refs.map, {
      center: start,
      zoom: 8
    });

    directionsDisplay.setMap(this.map);
    directionsDisplay.setPanel(null);
    directionsDisplay.setPanel(this.refs.directionsPanel);

    var request = {
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
    this.getMapAndDirections(this.props.start, this.props.end, this.props.mode);
  }

  shouldComponentUpdate(){
    return false;
  }

  componentWillReceiveProps(nextProps){

    console.log('nextProps:', nextProps)
    this.getMapAndDirections(nextProps.start, nextProps.end, nextProps.mode);
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


export class Distance extends Component {

  // componentDidMount(){
  //   console.log('componentDidMount',this.props.start)
  //   this.getDistance(this.props.destination, this.props.travelMode, this.props.mode);
  // }
  //
  // shouldComponentUpdate(){
  //   return false;
  // }
  //
  // componentWillReceiveProps(nextProps){
  //
  //   console.log('nextProps:', nextProps)
  //   this.getMapAndDirections(nextProps.start, nextProps.end, nextProps.mode);
  //   console.log('this.props.start:',this.props.start)
  // }
  //
  // render(){
  //   return(
  //     <div className="MapAndDirections row">
  //       <div className="col s12 m6" style={{padding:0}}>
  //         <div id="map" ref="map" />
  //       </div>
  //       <div className="col s12 m6" id="panelContainer" style={{padding:0}}>
  //         <div id="directionsPanel" ref="directionsPanel" />
  //       </div>
  //     </div>
  //   )
  // }


}
