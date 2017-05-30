import React, { Component } from 'react';

let modal;
class LocationDetails extends Component {
  constructor (){
    super();
    this.state = {
      modal: false
    }
  }
  render(){
    let modal = this.props.modal
    console.log(this.props)
    console.log(this.state.modal)
    console.log('modal',modal)
    return(
      <div className="LocationDetails">
        {modal ?
        <div className="modalWindow">
          <div className="row">
            <div className="col s12 m2 l3"></div>
            <div className="col s12 m8 l6">
              <div className="card">
                <div className="card-image">
                  {this.props.locationInfo.images ?
                  <img src={this.props.locationInfo.images[0]} />
                  : null}
                  <span className="card-title">{this.props.locationInfo.name}</span>
                </div>
                <div className="card-content modalContent">
                  <p>{this.props.locationInfo.description}</p>
                </div>
                <div className="card-action">
                  <span>
                    <button className="btn-floating btn-large waves-effect waves-light blue-grey lighten-2" onClick={()=>{modal=false}}>
                      <i className="material-icons">clear</i>
                    </button>
                  </span>
                </div>
              </div>
            </div>
            <div className="col s12 m2 l3"></div>
          </div>
        </div>
        : null}

      </div>
    )
  }
}
export default LocationDetails;
