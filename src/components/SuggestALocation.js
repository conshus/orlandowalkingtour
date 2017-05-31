/* global google */ //for google is not defined error: used in examples here https://tomchentw.github.io/react-google-maps/
import React, { Component } from 'react';
import UserMenu from './UserMenu';
import canUseDOM from "can-use-dom";
import base from '../rebase';
window.base = base;


//Get current location
const geolocation = (
  canUseDOM && navigator.geolocation ?
  navigator.geolocation :
  ({
    getCurrentPosition(success, failure) {
      failure(`Your browser doesn't support geolocation.`);
    },
  })
);

class SuggestALocation extends Component {
  constructor (props){
    super(props);
    this.state = {
      currentLocation: {}
    }
  }
  componentDidMount(){
    geolocation.getCurrentPosition((position) => {
      this.setState({
        currentLocation: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        //locations: this.state.origin
      })
    })
  }

  reverseGeocoding(){
    console.log('reverseGeocoding')
    var geocoder = new google.maps.Geocoder;
    //var latlng = {}
    geocoder.geocode({'location': this.state.currentLocation}, function(results, status) {
      if (status === 'OK') {
        if (results[0]) {
          document.getElementById('location_address').value=results[0].formatted_address;
          console.log(results[0].formatted_address);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    })

  }

  testingOnChange(){
    console.log('event',event)
    console.log('this',this.fileButton.files[0])
  }

  submitLocation(){
    console.log('submit location');
    //var fileButton = document.getElementById('fileButton');
    //Get file
    console.log('file',this.fileButton.files[0])
    var file = this.fileButton.files[0]
    //Create a storage ref
    var storageRef = base.storage().ref('photos/'+file.name);
    //Upload file
    storageRef.put(file);
  }
  render(){
    console.log('currentLocation',this.state.currentLocation)
    return(
      <div className="SuggestALocation">
        <UserMenu />
        <h1>Suggest A Location Works</h1>
        <div className="row">
          <div className="col s12 m2"></div>
          <div className="col s12 m8">


            <div className="card">
              <div className="card-image waves-effect waves-block waves-light">
                <img className="activator" src="images/office.jpg" />
              </div>
              <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">Card Title<i className="material-icons right">more_vert</i></span>
                <p><a href="#">This is a link</a></p>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="location_name" type="text" className="validate" />
                    <label htmlFor="location_name">Location Name</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12 m9">
                    <input placeholder="Enter address of press Locate button" id="location_address" type="text" className="validate" />
                    <label htmlFor="location_address">Location Address</label>
                  </div>
                  <div className="col s12 m3">
                    <a className="waves-effect waves-light btn-large" onClick={this.reverseGeocoding.bind(this)}><i className="material-icons left">cloud</i>Locate</a>
                  </div>
                </div>
                <form>
                  <div className="file-field input-field">
                    <div className="btn">
                      <span>Photo</span>
                      {/* <input id="fileButton" name="fileButton" ref="fileButton" type="file" accept="image/*" capture="camera" onChange={this.testingOnChange.bind(this)} /> */}
                      <input id="fileButton" name="fileButton" ref={(input) => { this.fileButton = input; }} type="file" accept="image/*" capture="camera" onChange={this.testingOnChange.bind(this)} />
                    </div>
                    <div className="file-path-wrapper">
                      <input className="file-path validate" type="text" />
                    </div>
                  </div>
                </form>

                <div className="row">
                  <div className="input-field col s12">
                    <textarea id="reason" className="materialize-textarea"></textarea>
                    <label htmlFor="reason">Reason for submission</label>
                  </div>
                </div>

                <div className="row">
                  <a className="waves-effect waves-light btn-large" onClick={this.submitLocation.bind(this)}><i className="material-icons left">cloud</i>Submit</a>
                </div>

              </div>
              <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                <p>Here is some more information about this product that is only revealed once clicked on.</p>
              </div>
            </div>


          </div>
          <div className="col s12 m2"></div>
        </div>
      </div>
    )
  }
}
export default SuggestALocation
