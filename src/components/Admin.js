import React, { Component } from 'react';
import base from '../rebase';
import UserMenu from './UserMenu';
import LocationDetails from './LocationDetails';
import materializecss from 'materialize-css';
var $ = window.jQuery = require('jquery');
import { Link } from 'react-router-dom';

class Admin extends Component {
  constructor (props){
    super(props);
    this.state = {
      user: {},
      submissions: [],
      allLocations: [],
      tours:[],
      users:[]
    }
  }
  componentDidMount(){
    window.$ = window.jQuery;
    $('ul.tabs').tabs();
    // console.log('componentDidMount');

    base.auth().onAuthStateChanged(user => {
      if (user) {
        // console.log('User is signed in.', user);
        this.setState({
          user: user
        })
       }
    });

    base.syncState(`submissions`, {
      context: this,
      state: 'submissions',
      asArray: true
    })


    base.syncState(`/historic-locations/orlando`,{
      context: this,
      state: 'allLocations',
      asArray: true,
      keepKeys: true
    })

    base.syncState(`tours`, {
      context: this,
      state: 'tours',
      asArray: true
    })

    base.syncState(`users`, {
      context: this,
      state: 'users',
      asArray: true
    })

  }

  displaySubmittedLocations(){
    return(
      <div id="submittedLocations" className="col s12">
        <h1> submitted locations </h1>

        {this.state.submissions.map((submittedlocation, index) => {
          console.log(submittedlocation)
          return(
            <div key={`submittedlocation-${index}`}>
              <h1>Submitted Location</h1>
              <h6>{submittedlocation.name}</h6>
              <h6>{submittedlocation.key}</h6>
            </div>

          )
        })}

      </div>
    )
  }
  displayAllLocations(){
    return(
      <div id="allLocations" className="col s12">
        <h1> all locations </h1>

        {this.state.allLocations.map((location, index) => {
          console.log(location)
          return(
            <div key={`location-${index}`}>
              <h1>Location</h1>
              <h6>{location.name}</h6>
              <h6>{location.key}</h6>
            </div>

          )
        })}



      </div>
    )
  }
  displayTours(){
    return(
      <div id="tours" className="col s12">
        <h1> all tours </h1>
        {this.state.tours.map((tour, index) => {
          console.log(tour)
          console.log(tour.sites[0])

          return(
            <div key={`tour-${index}`}>
              <h1><Link to={`/tour/${tour.key}`} className="waves-effect waves-light btn">{tour.tourName}</Link></h1>
            </div>

          )
        })}

      </div>
    )
  }
  displayUsers(){
    return(
      <div id="users" className="col s12">
        <h1> all users </h1>

        {this.state.users.map((user, index) => {
          console.log(user)
          return(
            <div key={`user-${index}`}>
              <h1>User</h1>
              <h6>{user.name}</h6>
              <h6>{user.key}</h6>
              <h6>{user.avatar}</h6>
            </div>

          )
        })}


      </div>
    )
  }

  render(){
    console.log('submitted Locations:',this.state.submissions)
    console.log('all Locations:',this.state.allLocations)
    console.log('tours:',this.state.tours)
    console.log('users:',this.state.users)
    return(
      <div className="Admin">
        <UserMenu />
        <div className="row">
          <div className="col s12">
            <ul className="tabs tabs-fixed-width">
              <li className="tab col s3"><a className="active" href="#submittedLocations" >Submitted Locations</a></li>
              <li className="tab col s3"><a href="#allLocations">All Locations</a></li>
              <li className="tab col s3"><a href="#tours">Tours</a></li>
              <li className="tab col s3"><a href="#users">Users</a></li>
            </ul>
          </div>
          {this.displaySubmittedLocations()}
          {this.displayAllLocations()}
          {this.displayTours()}
          {this.displayUsers()}
        </div>
      </div>
    )
  }
}
export default Admin;
