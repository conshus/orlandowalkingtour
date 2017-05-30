import React, { Component } from 'react';
import UserMenu from './UserMenu'

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
                <input type="file" accept="image/*" capture="camera" />
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
