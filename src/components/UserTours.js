import React, { Component } from 'react';
import base from '../rebase';
window.base = base;
import materializecss from 'materialize-css';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu'

class UserTours extends Component {
  constructor(){
    super();
    this.state = {
      user: {},
      savedTours: []
    }
  }

  componentDidMount(){
    base.auth().onAuthStateChanged(user => {
      if (user){
        console.log('User is signed in.', user)
        base.listenTo(`/users/${user.uid}/tours/`, {
          context: this,
          asArray: true,
          then(savedTours){
            let newSavedTours;
            console.log('savedTours:',savedTours);
            savedTours.map(savedTour => {
              base.fetch(`/tours/${savedTour.key}`,{
                context:this,
                asArray: false,
                then(tourInfo){
                  console.log('tourInfo:',tourInfo);
                  newSavedTours = this.state.savedTours.concat({...tourInfo, tourId: savedTour.key})
                  this.setState({
                    savedTours: newSavedTours
                  })
                }
              })
            })
          }
        })
      }
    })
    console.log('this.state.savedTours:',this.state.savedTours)
  }

  listSavedTours(){
    return(
      <div id="savedTours">
        <h6>Tours</h6>
        {console.log('this.state.savedTours:',this.state.savedTours)}

        {this.state.savedTours.map((savedTour, index) => {
          console.log(savedTour)
          return(
            <div key={`savedTour-${index}`}>
              <h1><Link to={`/tour/${savedTour.tourId}`} className="waves-effect waves-light btn">{savedTour.tourName}</Link></h1>
            </div>

          )
        })}
      </div>
    )
  }

  pleaseLogIn(){
    return(
      <div id="pleaseLogIn">
        <h6>Please Login In</h6>
        <Link to="/" className="waves-effect waves-light btn">Home</Link>
      </div>
    )
  }

  render(){
    return(
      <div className="UserTours">
        <UserMenu />
        <h1>Your Saved Tours</h1>
        {this.state.user && this.listSavedTours()}
      </div>
    )
  }
}

export default UserTours;
