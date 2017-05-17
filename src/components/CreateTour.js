import React, { Component } from 'react';
import UserMenu from './UserMenu';
import Map from './Map';
import Locations from './Locations'
import base from '../rebase';
window.base = base; //Use base from console

class CreateTour extends Component {
  constructor (){
    super();
    this.state = {
      user: {},
      locations:[],
      tours:[]
    }
  }

  componentDidMount() {
    base.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('User is signed in.', user);
        this.setState({
          user: user
        })
        base.syncState(`/historic-locations/orlando`,{
          context: this,
          state: 'locations',
          asArray: true
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


  render() {
    {console.log(this.state.locations)}

    return (
      <div className="CreateTour">
        <UserMenu />
        <div className="row">
          <div className="col s12 m6" style={{padding:0}}>
            <Map
              containerElement={<div id='containerElement' />}
              mapElement={<div id='mapElement' />}
            />
          </div>
          <div className="col s12 m6"><Locations locations={this.state.locations} /></div>
        </div>
      </div>
    )
  }
}

export default CreateTour;
