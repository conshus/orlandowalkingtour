/* global google */ //for google is not defined error: used in examples here https://tomchentw.github.io/react-google-maps/
import canUseDOM from "can-use-dom";
import React, { Component } from 'react';
import UserMenu from './UserMenu';
import Map from './Map';
import Locations from './Locations'
import base from '../rebase';
import Distance from './Distance'

const geolocation = (
  canUseDOM && navigator.geolocation ?
  navigator.geolocation :
  ({
    getCurrentPosition(success, failure) {
      failure(`Your browser doesn't support geolocation.`);
    },
  })
);


class CreateTour extends Component {
  constructor (){
    super();
    this.state = {
      user: {},
      locations:[],
      tours:[],
      allLocations:[],
      mapLocations:[],
      currentLocation:{},
      allLocationsAddresses:[],
      allAddressesString:'',
      allAddressesStringArray:[]
    }
  }

  initialDistances(position){
    console.log('success:', position);
    console.log('this.state:',this.state);
    //let allLocations=this.state.locations.map((location,index) => {
      var geocorder = new google.maps.Geocoder;
      var service = new google.maps.DistanceMatrixService;
      console.log(this.state.allAddressesStringArray[1])
      service.getDistanceMatrix({
          //origins: ['Orlando, FL'],
          origins: [{lat: position.coords.latitude, lng: position.coords.longitude}],
          destinations: ["37 North Orange Avenue","1400 Sligh Boulevard","46 N. Orange Avenue","100-102 W. Church Street","36 West Pine Street","140 North Magnolia Avenue","100 Rosearden Dr","2 South Orange Avenue","519 W. South Street","1327 Eastin Avenue","596 W. Church Street","15-17 West Pine Street","35 East Pine Street","301 N. Ivanhoe Boulevard East","578 N. Orange Avenue","24 N. Rosalind Avenue","190 S. Orange Avenue","500 S. Orange Avenue","800 W. Grand Street","647 West South Street","1730 N. Forest Avenue","125 N. Lucerne Circle East","23-25 W. Church Street","1418 Clouser Avenue","704 Kuhl Avenue"],
          travelMode: 'WALKING',
          unitSystem: google.maps.UnitSystem.IMPERIAL,
          avoidHighways: false,
          avoidTolls: false
        }, function(response, status) {
          if (status !== 'OK') {
            console.log('Error was: ' + status);
          } else {
            console.log('response:',response)
          }
      // return(
      //   {...location, selected: false, shortenedLatLng: shortenedLatLng }
      // )
    })
  //})
  }
  componentDidMount() {


    // geolocation.getCurrentPosition((position) => {
    //   this.setState({
    //     currentLocation: {
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude
    //     }
    //   })
    // })
    console.log('Current Location', this.state.currentLocation)
    base.auth().onAuthStateChanged(user => {
      if (user) {
        // console.log('User is signed in.', user);
        this.setState({
          user: user
        })
        // base.syncState(`/historic-locations/orlando`,{
        //   context: this,
        //   state: 'locations',
        //   asArray: true
        // })
        let allAddressesStringArray =[];
        let allAddressesString='';
        base.fetch(`/historic-locations/orlando`,{
          context: this,
          asArray: true,
          then(locations){
            // console.log(locations);
            let spacer, numIndex;
            let allLocations=locations.map((location,index) => {
              //console.log(location)
              let numIndex = Math.floor(index/25)
              let shortenedLatLng = {lat: location.location.latitude, lng: location.location.longitude}
              if (index%25 === 0){
                spacer = '';
                allAddressesStringArray[numIndex]=allAddressesString;
                //allAddressesString = '';
              } else {
                spacer =','
              }
              console.log(Math.floor(index/25))
              if (index < 25){
                allAddressesString = allAddressesString.concat(spacer+'"'+location.address+'"');
              }
              //console.log(shortenedLatLng)
              //this.getDistance(shortenedLatLng)
          //let locationDistance = <Distance destination={shortenedLatLng} travelMode='walking' showDistance='true' showDuration='true' />
              // let distance={<Distance destination={lat: location.location.latitude, lng: location.location.longitude} travelMode={this.state.travelMode} showDistance='true' showDuration='true' />}
              //console.log({(<Distance destination={lat: location.location.latitude, lng: location.location.longitude} travelMode='walking' showDistance='true' showDuration='true' />)})
              //console.log(locationDistance)
              return(
                {...location, selected: false, shortenedLatLng: shortenedLatLng }
              )
            })
            console.log('allAddressesStringArray: ',allAddressesStringArray)
            let allLocationsAddresses = locations.map((location,index) => {
              return( location.shortenedLatLng )
            })
            console.log(allLocationsAddresses);
            this.setState({
              locations: allLocations,
              allLocations: allLocations,
              mapLocations: allLocations,
              allLocationsAddresses: allLocationsAddresses,
              allAddressesString: allAddressesString,
              allAddressesStringArray: allAddressesStringArray

            })
          }
        })
        base.syncState(`/users/${user.uid}/tours`,{
          context: this,
          state: 'tours',
          asArray: true
        })
      } else {
        console.log('User is logged out.')
        this.setState({
          user: {}
        })
       }
    });
    geolocation.getCurrentPosition(this.initialDistances.bind(this))

  }

  // getDistance(destination){
  //   console.log ('Destination:', destination)
  // }

  toggleLocation(toggledLocation){
    console.log('toggleLocation', toggledLocation)
    let newLocationsArray = this.state.locations.map(function(location, index) {
      if (location === toggledLocation){
        location.selected = !toggledLocation.selected;
      }
      return(location);
    })
    this.setState({
      locations: newLocationsArray
    })
  }

  switchLocationState(locationsToShow){
    console.log('switchLocationState',locationsToShow)
    let newLocationsArray;
    if (locationsToShow === 'selected'){
      newLocationsArray = this.state.allLocations.filter(function(location,index){
        if (location.selected === true){
          return(location)
        }
      })
    } else {
      newLocationsArray = this.state.allLocations
    }
    this.setState({
      mapLocations: newLocationsArray
    })
  }

  render() {
    // {console.log(this.state.locations)}
    console.log(this.state.currentLocation)

    return (
      <div className="CreateTour">
        <UserMenu />
        <div className="row">
          <div className="col s12 m6" style={{padding:0}}>
            <Map
              locations={this.state.mapLocations}
              containerElement={<div id='containerElement' />}
              mapElement={<div id='mapElement' />}
            />
          </div>
          <div className="col s12 m6">
            <Locations
              locations={this.state.locations}
              allLocations={this.state.allLocations}
              sendLocationToggleToCreateTour={this.toggleLocation.bind(this)}
              switchLocationState={this.switchLocationState.bind(this)}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default CreateTour;
