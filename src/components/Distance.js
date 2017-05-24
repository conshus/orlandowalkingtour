import React, { Component } from 'react';
import axios from 'axios';

//
// var origin1 = new google.maps.LatLng(55.930385, -3.118425);
// var origin2 = 'Greenwich, England';
// var destinationA = 'Stockholm, Sweden';
// var destinationB = new google.maps.LatLng(50.087692, 14.421150);
//
// var service = new google.maps.DistanceMatrixService();
// service.getDistanceMatrix(
//   {
//     origins: [origin1, origin2],
//     destinations: [destinationA, destinationB],
//     travelMode: 'DRIVING',
//     transitOptions: TransitOptions,
//     drivingOptions: DrivingOptions,
//     unitSystem: UnitSystem,
//     avoidHighways: Boolean,
//     avoidTolls: Boolean,
//   }, callback);
//
// function callback(response, status) {
//   // See Parsing the Results for
//   // the basics of a callback function.
// }

class Distance extends Component {
  constructor (){
    super();
    this.state = {
      distance: null,
      duration: null
    }
  }
  componentDidMount() {
    axios.get('https://tiy-orl-proxy.herokuapp.com/conshus-map?origins='+this.props.origin.lat+','+this.props.origin.lng+'&destinations='+this.props.destination.lat+','+this.props.destination.lng+'&mode='+this.props.travelMode+'&units=imperial&language=en-US&key=AIzaSyBs6d9RlcvwZc1RfezhN4XO2rx8EbGzEfU')
    //.then(response => console.log(response) );
    .then(response => {
      this.setState({
        distance: response.data.rows[0].elements[0].distance.text,
        duration: response.data.rows[0].elements[0].duration.text
      })
    });
  }
  render() {
    console.log(this.props)
    console.log(this.state)
    return (
      <div className="Distance">
        <span>&nbsp;{this.props.showDistance=='true' && this.state.distance}&nbsp;</span>
        <span>&nbsp;{this.props.showDuration=='true' && this.state.duration}&nbsp;</span>
      </div>
    )
  }
}

export default Distance;
