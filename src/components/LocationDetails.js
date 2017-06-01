import React, { Component } from 'react';

let modal;
class LocationDetails extends Component {
  constructor (){
    super();
    this.state = {
      modal: false
    }
  }
  componentDidMount(){
    console.log('componentDidMount', this.props)
    this.setState({
      modal: this.props.modal
    })
  }

  componentWillReceiveProps(nextProps){
    console.log('nextProps:', nextProps)
    this.setState({
      modal: nextProps.modal
    })
  }
  sendBackModalChange(tourLegButtonPressed){
    console.log(tourLegButtonPressed)
    this.props.sendBackModalChange(tourLegButtonPressed);
    this.setState({
      modal: !this.state.modal
    })
  }

  render(){
    console.log('this.props',this.props)
    console.log('this.state.modal',this.state.modal)
    console.log('modal',modal)
    return(
      <div className="LocationDetails">
        {this.state.modal ?
        <div className="modalWindow">
          <div className="row">
            <div className="col s12 m2 l3"></div>
            <div className="col s12 m8 l6">
              <div className="card">
                <div className="card-image location-image-card">
                  {this.props.locationInfo.images ?
                  <img src={this.props.locationInfo.images[0]} />
                  : null}
                  <span className="card-title location-details">{this.props.locationInfo.name}</span>
                </div>
                <div className="card-content modalContent">
                  <p>{this.props.locationInfo.address}</p>

                  <p>{this.props.locationInfo.description}</p>
                </div>
                <div className="card-action">
                  <span>
                    {this.props.tourLeg ?
                      <span><h6>Where to?</h6>
                      {this.props.tourLeg.previousButton ? <button className="btn-large waves-effect waves-light" onClick={this.sendBackModalChange.bind(this,'previous')}>Previous</button>:null}
                      {this.props.tourLeg.backToStartButton ? <button className="btn-large waves-effect waves-light" onClick={this.sendBackModalChange.bind(this,'backToStart')}>back to Start</button>:null}
                      {this.props.tourLeg.nextButton ? <button className="btn-large waves-effect waves-light" onClick={this.sendBackModalChange.bind(this,'next')}>Next</button>:null}
                      </span>

                      : <button className="btn-floating btn-large waves-effect waves-light blue-grey lighten-2" onClick={this.sendBackModalChange.bind(this)}>
                        <i className="material-icons">clear</i>
                      </button>
                    }
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
