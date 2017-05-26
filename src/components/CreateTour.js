import React, { Component } from 'react';
import UserMenu from './UserMenu';
import Map from './Map';
import Locations from './Locations'
import base from '../rebase';
window.base = base; //Use base from console
import Distance from './Distance'

class CreateTour extends Component {
  constructor (){
    super();
    this.state = {
      user: {},
      locations:[],
      tours:[],
      allLocations:[],
      mapLocations:[]
    }
  }

  componentDidMount() {
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
        base.fetch(`/historic-locations/orlando`,{
          context: this,
          asArray: true,
          then(locations){
            // console.log(locations);
            let allLocations=locations.map((location,index) => {
              //console.log(location)
              let shortenedLatLng = {lat: location.location.latitude, lng: location.location.longitude}
              //console.log(shortenedLatLng)
              let locationDistance = <Distance destination={shortenedLatLng} travelMode='walking' showDistance='true' showDuration='true' />
              // let distance={<Distance destination={lat: location.location.latitude, lng: location.location.longitude} travelMode={this.state.travelMode} showDistance='true' showDuration='true' />}
              //console.log({(<Distance destination={lat: location.location.latitude, lng: location.location.longitude} travelMode='walking' showDistance='true' showDuration='true' />)})
              //console.log(locationDistance)
              return(
                {...location, selected: false}
              )
            })
            // console.log(allLocations);
            this.setState({
              locations: allLocations,
              allLocations: allLocations,
              mapLocations: allLocations
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

  }

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
