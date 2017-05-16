import React, { Component } from 'react';
import UserMenu from './UserMenu';
import Map from './Map';
import Locations from './Locations'

class CreateTour extends Component {
  render() {
    return (
      <div className="CreateTour">
        <UserMenu />
        <div className="row">
          <div className="col s12 m6" style={{padding:0}}>
            <Map
              containerElement={<div style={{height:50+'vh'}} />}
              mapElement={<div style={{height:50+'vh'}} />}
            />
          </div>
          <div className="col s12 m6"><Locations /></div>
        </div>
      </div>
    )
  }
}

export default CreateTour;
