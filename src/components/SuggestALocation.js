import React, { Component } from 'react';
import UserMenu from './UserMenu';
import canUseDOM from "can-use-dom";

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
  render(){
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
                    <input id="location_address" type="text" className="validate" />
                    <label htmlFor="location_address">Location Address</label>
                  </div>
                  <div className="col s12 m3">
                    <a className="waves-effect waves-light btn-large"><i className="material-icons left">cloud</i>Locate</a>
                  </div>
                </div>
                <form>
                  <div className="file-field input-field">
                    <div className="btn">
                      <span>Photo</span>
                      <input type="file" accept="image/*" capture="camera" />
                    </div>
                    <div className="file-path-wrapper">
                      <input className="file-path validate" type="text" />
                    </div>
                  </div>
                </form>

                <div className="row">
                  <div className="input-field col s12">
                    <textarea id="reason" className="materialize-textarea"></textarea>
                    <label htmlFor="reason">Textarea</label>
                  </div>
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
