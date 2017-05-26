import React, { Component } from 'react';
import axios from 'axios';


class Directions extends Component {
  constructor(){
    super();
    this.state = {

    }
  }
  componentDidMount(){
    axios.get('https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key=AIzaSyBs6d9RlcvwZc1RfezhN4XO2rx8EbGzEfU')
    //.then(response => console.log(response) );
    .then(response => {
      console.log(response)
    });

  }
  render(){
    return(
      <div>Directions works!</div>
    )
  }

}

export default Directions;
