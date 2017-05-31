/* global google */ //for google is not defined error: used in examples here https://tomchentw.github.io/react-google-maps/
import React, { Component } from 'react';
import UserMenu from './UserMenu';
import canUseDOM from "can-use-dom";
import base from '../rebase';
import image_placeholder from "../../public/images/image_placeholder.png";
import { Link } from 'react-router-dom';
import axios from 'axios';


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
      user:{},
      currentLocation: {},
      imgsrc: image_placeholder,
      addPhotoButtonText: 'Add Photo',
      locateButtonText: 'Locate',
      locationSubmitted: false,
      thankYouGiphy: null
    }
  }
  componentDidMount(){
    base.auth().onAuthStateChanged(user => {
      if (user){
        console.log('User is signed in.', user)
        this.setState({
          user: user
        })
      }
    })
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
    this.setState({
      locateButtonText: 'Locating...'
    })
    var geocoder = new google.maps.Geocoder;
    //var latlng = {}
    geocoder.geocode({'location': this.state.currentLocation}, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.setState({
            locateButtonText: 'Located'
          })
          document.getElementById('location_address').value=results[0].formatted_address;
          console.log(results[0].formatted_address);
        } else {
          document.getElementById('location_address').value='No results found';
          window.alert('No results found');
        }
      } else {
        document.getElementById('location_address').value='Geocoder failed due to: ' + status;
        window.alert('Geocoder failed due to: ' + status);
      }
    })

  }

  uploadImage(){
    console.log('event',event)
    console.log('this',this.fileButton.files[0])
    var file = this.fileButton.files[0]
    //Create a storage ref
    var storageRef = base.storage().ref(this.state.user.uid+'/photos/'+file.name);
    //Upload file
    var uploadTask = storageRef.put(file);


    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(base.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({
          addPhotoButtonText: 'uploading...'+progress+'%'
        })
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case base.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case base.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, (error) => {

      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;
        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, () => {
      // Upload completed successfully, now we can get the download URL
      var downloadURL = uploadTask.snapshot.downloadURL;
      console.log('downloadURL:',downloadURL)
      this.setState({
        imgsrc: downloadURL,
        addPhotoButtonText: 'Add Photo'
      })
    });


  }

  submitLocation(){
    console.log('submit location');
    base.push(`submissions/`,{
      data: {
        address: this.location_address.value,
        name: this.location_name.value,
        description: this.reason.value,
        location: {latitude: this.state.currentLocation.lat, longitude: this.state.currentLocation.lng},
        type: 'Building',
        images: {'0': this.state.imgsrc},
        user: this.state.user.displayName,
        userId: this.state.user.uid,
        submitted: base.database.ServerValue.TIMESTAMP
      }
    }).then(() => this.setState({locationSubmitted: true}))
  }


  displaySubmissionForm(){
    return(
      <div className="card">
        <div className="card-content">
          <div className="row">
            <div className="input-field col s12">
              <input id="location_name" type="text" className="validate" ref={(input) => { this.location_name = input; }} />
              <label htmlFor="location_name">Location Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12 m9">
              <input placeholder="Enter address or press Locate button" id="location_address" type="text" className="validate" ref={(input) => { this.location_address = input; }} />
              <label htmlFor="location_address">Location Address</label>
            </div>
            <div className="col s12 m3">
              <a className="waves-effect waves-light btn-large" onClick={this.reverseGeocoding.bind(this)}>{this.state.locateButtonText}</a>
            </div>
          </div>
          <form>
            <div className="file-field input-field">
              <div className="btn">
                <span>{this.state.addPhotoButtonText}</span>
                <input id="fileButton" name="fileButton" ref={(input) => { this.fileButton = input; }} type="file" accept="image/*" capture="camera" onChange={this.uploadImage.bind(this)} />
              </div>
                <img className="responsive-img" src={this.state.imgsrc} />
            </div>
          </form>
          <div className="row">
            <div className="input-field col s12">
              <textarea id="reason" name="reason" ref={(input) => { this.reason = input; }} className="materialize-textarea"></textarea>
              <label htmlFor="reason">Reason for submission</label>
            </div>
          </div>
          <div className="row">
            <a className="waves-effect waves-light btn-large" onClick={this.submitLocation.bind(this)}><i className="material-icons left">cloud</i>Submit</a>
          </div>
        </div>
      </div>
    )
  }

  displayThankYou(){
    if(!this.state.thankYouGiphy){
    axios.get('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=thank+you')
    .then(response => this.setState({thankYouGiphy: response.data.data.image_url}))
    }
//    .then(response => console.log(response.data.data.image_url))
    return (
      <div>
        <h1>Location Submitted</h1>
        {this.state.thankYouGiphy ? <img className="responsive-img" src={this.state.thankYouGiphy}/> : null}
        <br/><Link to="/" className="waves-effect waves-light btn-large">Back to Home</Link>
      </div>

    )
  }
  render(){
    //console.log('currentLocation',this.state.currentLocation)
    return(
      <div className="SuggestALocation">
        <UserMenu />
        <div className="row">
          <div className="col s12 m2"></div>
          <div className="col s12 m8">
            {this.state.locationSubmitted ? this.displayThankYou() : this.displaySubmissionForm()}
          </div>
          <div className="col s12 m2"></div>
        </div>
      </div>
    )
  }
}
export default SuggestALocation
