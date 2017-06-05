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
      users:[],
      modal: false,
      moreInfoLocation:{}
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

  modalChange(){
    console.log('modalChange')
    this.setState({
      modal: !this.state.modal
    })
  }


  deleteSubmission(submissionId){
    console.log("delete Tour", submissionId);
    base.remove(`submissions/${submissionId}`)

  }

  approveSubmission(submission){
    console.log("approve Tour", submission);
    base.push(`historic-locations/orlando`,{
      data: {
        address: submission.address,
        description: submission.description,
        images: {'0': submission.images[0]},
        location: {latitude: submission.location.latitude, longitude: submission.location.longitude},
        name: submission.name,
        type: submission.type,
        submittedUser: submission.user,
        submittedUserId: submission.userId
      }
    })

   base.remove(`submissions/${submission.key}`)

  }

  displaySubmittedLocations(){
    return(
      <div id="submittedLocations" className="col s12">
        <h1> submitted locations </h1>

        {this.state.submissions.map((submittedlocation, index) => {
          console.log('submitted location:',submittedlocation)
          return(
            <div key={`submittedlocation-${index}`} className="card horizontal">
              <div className="card-image">
                <img src={submittedlocation.images[0]} />
              </div>
              <div className="card-stacked">
                <div className="card-content">
                  <h4>{submittedlocation.name}</h4>
                  <h6>by {submittedlocation.user}</h6>
                </div>
                <div className="card-action">
                  <a className="btn waves-effect waves-light" onClick={()=>{this.setState({moreInfoLocation: submittedlocation, modal: true})}}>
                    <i className="material-icons">search</i> Review
                  </a>
                  <a className="btn waves-effect waves-light red" onClick={this.deleteSubmission.bind(this,submittedlocation.key)}><i className="material-icons">delete</i>Delete</a>
                  <a className="btn waves-effect waves-light green" onClick={this.approveSubmission.bind(this,submittedlocation)}><i className="material-icons">check_circle</i>Approve</a>

                </div>
              </div>

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

  deleteTour(tourId){
    console.log("delete Tour", tourId);
    base.remove(`tours/${tourId}`)

  }

  displayTours(){
    return(
      <div id="tours" className="col s12">
        <h1> all tours </h1>
        <div className="row">
          {this.state.tours.map((tour, index) => {
            console.log(tour)
            console.log(tour.sites[0])

            return(
              <div key={`tour-${index}`} className="col s12 m4">
                <h1><Link to={`/tour/${tour.key}`} className="waves-effect waves-light btn">{tour.tourName}</Link></h1>
                <a className="btn-large waves-effect waves-light red" onClick={this.deleteTour.bind(this,tour.key)}><i className="material-icons">delete</i>Delete</a>

              </div>

            )
          })}
        </div>

      </div>
    )
  }

  deleteUser(userId){
    console.log("delete User", userId);
    base.remove(`users/${userId}`)

  }
  displayUsers(){
    return(
      <div id="users" className="col s12">
        <h1> all users </h1>
        <div className="row">
          {this.state.users.map((user, index) => {
            console.log(user)
            return(
              <div key={`user-${index}`} className="col s12 m3">
                <div className="card">
                  <div className="card-image">
                    <img src={user.avatar} className="responsive-img userAvatar"/>
                  </div>
                  <div className="card-content">
                    <h6>{user.name}</h6>
                  </div>
                  <div className="card-action">
                    <a className="btn-large waves-effect waves-light red" onClick={this.deleteUser.bind(this,user.key)}><i className="material-icons">delete</i>Delete</a>
                  </div>
                </div>
              </div>

            )
          })}
      </div>

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
              {/* <li className="tab col s3"><a href="#allLocations">All Locations</a></li> */}
              <li className="tab col s3"><a href="#tours">Tours</a></li>
              <li className="tab col s3"><a href="#users">Users</a></li>
            </ul>
          </div>
          {this.displaySubmittedLocations()}
          {/* {this.displayAllLocations()} */}
          {this.displayTours()}
          {this.displayUsers()}
        </div>

          <LocationDetails sendBackModalChange = {this.modalChange.bind(this)} locationInfo = {this.state.moreInfoLocation} modal = {this.state.modal}/>

      </div>
    )
  }
}
export default Admin;
