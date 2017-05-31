import React, { Component } from 'react';
import materializecss from 'materialize-css';
//import $ from 'jquery';
var $ = window.jQuery = require('jquery');
window.Vel = require('materialize-css/js/velocity.min'); //needed this to make the sideNav open. found solution here: https://github.com/Dogfalo/materialize/issues/1229#issuecomment-242328892
import base from '../rebase';
import Distance from './Distance';
import LocationDetails from './LocationDetails';

import { render } from 'react-dom';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove,
} from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => <span><i className="material-icons">reorder</i></span>);

const SortableItem = SortableElement(({value, toggleSelect}) => {
  return (
    <li  className="collection-item left-align">
      <span className=""><DragHandle /></span>
      {/* <input className="left" type="checkbox" id={'selected-'+value.key} checked="checked" />
      <label htmlFor={'selected-'+value.key}> */}
        <span className="">{value.name}</span>
      {/* </label> */}
      {/* <a href="#" data-activates="moreInfoSlideOut" className="secondary-content moreInfo">
        <i className="material-icons">
          info_outline
        </i>
      </a> */}
      <a onClick={toggleSelect.bind(this,value,'selected')} className="secondary-content">
        <i className="material-icons">
          clear
        </i>
      </a>

    </li>
  );
});

const SortableList = SortableContainer(({items, toggleSelect}) => {
  return (
    //<ul>
    <span>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} toggleSelect={toggleSelect} />
      ))}
    </span>
    //</ul>
  );
});


class SortableComponent extends Component {
  // state = {
  //   items: ['Item 1a', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
  // };
  sendBackToggleSelect(){
    console.log('sendBackToggleSelect')
    //this.props.sendBackTourLocations();

  }
  // onSortEnd = ({oldIndex, newIndex}) => {
  //   let {items} = this.state;
  //
  //   this.setState({
  //     items: arrayMove(items, oldIndex, newIndex),
  //   });
  // };
  render() {
//     let {items} = this.state;
// console.log(this.state.items);
//console.log(this.props.tourLocations);
    // return <SortableList items={this.props.tourLocations} onSortEnd={this.onSortEnd} useDragHandle={true} />;
    return (<SortableList
      items={this.props.tourLocations}
      onSortEnd={this.props.sendBackTourLocations}
      toggleSelect={this.props.toggleSelect.bind(this)}
      useDragHandle={true} />)
  }
}



class Locations extends Component {

  constructor (){
    super();
    this.state = {
      user: {},
      tourLocations:[],
      initialSave: false,
      tourId:'',
      disableSave: false,
      modal: false,
      moreInfoLocation:{}
    }
  }

  componentDidMount(){
    window.$ = window.jQuery;
    $('ul.tabs').tabs();
    $('.moreInfo').sideNav();
    // console.log('componentDidMount');

    base.auth().onAuthStateChanged(user => {
      if (user) {
        // console.log('User is signed in.', user);
        this.setState({
          user: user
        })
       }
    });
  }


  onSortEnd = ({oldIndex, newIndex}) => {
    //let {items} = this.state;

    this.setState({
      tourLocations: arrayMove(this.state.tourLocations, oldIndex, newIndex),
      disableSave: false,
    });
  };


  saveTour(){
    let tourName = this.tourName.value;
    console.log(tourName)
    let tourLocationIdsOnly = this.state.tourLocations.map((location,index)=>location.key);
    console.log(tourLocationIdsOnly)
    if (this.state.tourId === '' && this.state.initialSave === false){
      base.push(`/tours/`,
      { data: {creator: this.state.user.displayName, creatorId: this.state.user.uid, tourName: tourName, sites: tourLocationIdsOnly, created: base.database.ServerValue.TIMESTAMP, creatorPhoto: this.state.user.photoURL }})
      .then(results => {
        console.log(results.key)
        console.log(this.state.initialSave)
        this.setState({
          initialSave: true,
          tourId: results.key,
          disableSave: true,
        })
        //base.post(`/users/${this.state.user.uid}/`, {data: {name: this.state.user.displayName, avatar: this.state.user.photoURL}})
        base.post(`/users/${this.state.user.uid}/tours/${results.key}/`, {data: {created: base.database.ServerValue.TIMESTAMP}})
        //console.log(this.state)
      })
      //.then()
//)
    } else {
      console.log('already in Firebase', this.state.tourId)
      base.post(`/tours/${this.state.tourId}/`,
      { data: {creator: this.state.user.displayName, creatorId: this.state.user.uid, tourName: tourName, sites: tourLocationIdsOnly}})
      //.then(results => {
        //console.log(results.key)
        console.log(this.state.initialSave)
        this.setState({
          disableSave: true,
        })
        console.log(this.state)
      //})
    }

  }


  toggleSelect(locationToggled,locationsToShow){
    console.log('location toggleSelect:',locationToggled, locationsToShow);
    this.props.sendLocationToggleToCreateTour(locationToggled);
    let newTourLocationsArray;
    let locationBeingChecked = this.state.tourLocations.find(function(location){
      return location.key === locationToggled.key
    })
    // console.log(locationBeingChecked)
    if (locationBeingChecked){
      console.log('already in list, needs to be removed')
      newTourLocationsArray = this.state.tourLocations.filter(function(location, index){
        if (location !== locationToggled){
          return(location)
        }
      })

    } else {
      newTourLocationsArray = this.state.tourLocations.concat(locationToggled)

    }
    this.setState({
      tourLocations: newTourLocationsArray,
      disableSave: false,
    })
    //if (locationsToShow === 'selected'){
       this.switchLocationState(locationsToShow)
     //}
  }

getDistance(location){
  //console.log('getDistance', location)
  let shortenedLatLng = {lat: location.location.latitude, lng: location.location.longitude}
  return <Distance destination={shortenedLatLng} travelMode='walking' showDistance='true' showDuration='false' />
}

  toggleModal(location){
    console.log('toggleModal', location)
    this.setState({
      modal: !this.state.modal,
      moreInfoLocation: location
    })
  }

  displayAllLocations(){
    return(
      <div>
        <div id="allLocations" className="col s12">
          <ul className="collection">
            <form action="#">
              {this.props.locations.map((location, index) => {
                return(
                  <li className="collection-item" key={location.key}>
                    <div className="left-align">
                      {/* <input className="left" type="checkbox" id={location.key} onClick={this.toggleSelect.bind(this,location)}  /> */}
                        <input className="left" type="checkbox" id={location.key} onClick={this.toggleSelect.bind(this,location,'all')}  checked={location.selected ? 'checked' : ''} />
                      <label htmlFor={location.key}>
                        {location.name}
                        {this.getDistance(location)}
                      </label>
                      {/* <a onClick={this.toggleModal.bind(this,location)} data-activates="moreInfoSlideOut" className="secondary-content moreInfo"> */}
                      <a onClick={()=>{this.setState({moreInfoLocation: location, modal: true})}} data-activates="moreInfoSlideOut" className="secondary-content moreInfo">
                        <i className="material-icons">info_outline</i>
                      </a>
                    </div>
                  </li>
                )
              })}
            </form>
          </ul>
        </div>
      </div>
    )
  }
  displaySelectedLocations(){
    // if (!this.state.tourLocations){
    //   this.setState({
    //     disableSave: true
    //   })
    // }
    return(
      <div>
        <div id="selectedLocations" className="col s12">
          <div className="row noBottom">
            <div className="input-field col s6">
              <input id="tourName" type="text" className="validate noBottom"  ref={(input) => { this.tourName = input; }} />
              <label htmlFor="tourName">Enter a name for your tour</label>
            </div>
            <div className="col s6 valign-wrapper">
              <button className="waves-effect waves-light btn"
                onClick={this.saveTour.bind(this)} disabled={this.state.disableSave ? 'disabled' : ''}>Save</button>
              <a href="#" data-activates="moreInfoSlideOut" className="moreInfo"><i className="material-icons">menu</i></a>
            </div>
          </div>
          <ul className="collection">
            <form action="#">
              <SortableComponent
                tourLocations={this.state.tourLocations}
                sendBackTourLocations={this.onSortEnd.bind(this)}
                toggleSelect={this.toggleSelect.bind(this)}
              />
            </form>
          </ul>
        </div>
      </div>
    )
  }
  switchLocationState(location){
    console.log("switchLocationState in Location.js", this, location)
    this.props.switchLocationState(location);
//    if (location=='selected'){
      // this.props.switchLocationState(this.state.tourLocations);
//      this.props.switchLocationState('selected');
//    } else {
      //this.props.switchLocationState(this.props.allLocations);
//      this.props.switchLocationState('all');
//    }
  }

  modalChange(){
    console.log('modalChange')
    this.setState({
      modal: !this.state.modal
    })
  }
  render() {
    // console.log(this.props.locations)
    // console.log(this.state.tourLocations)

    return (
      <div className="Locations">
        <div className="row">
          <div className="col s12">
            <ul className="tabs tabs-fixed-width">
              <li className="tab col s3"><a className="active" href="#allLocations" onClick={this.switchLocationState.bind(this,'all')}>All Locations</a></li>
              <li className="tab col s3"><a href="#selectedLocations" onClick={this.switchLocationState.bind(this,'selected')}>Selected Locations</a></li>
            </ul>
          </div>
          {this.displayAllLocations()}
          {this.displaySelectedLocations()}
        </div>

        {/* <ul id="moreInfoSlideOut" className="side-nav">
          <li><div className="userView">
            <div className="background">
              <img src="images/office.jpg" />
            </div>
            <a href="#!user"><img className="circle" src="images/yuna.jpg"/></a>
            <a href="#!name"><span className="white-text name">John Doe</span></a>
            <a href="#!email"><span className="white-text email">jdandturk@gmail.com</span></a>
          </div></li>
          <li><a href="#!"><i className="material-icons">cloud</i>First Link With Icon</a></li>
          <li><a href="#!">Second Link</a></li>
          <li><div className="divider"></div></li>
          <li><a className="subheader">Subheader</a></li>
          <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
        </ul> */}


        {/* Modal */}
        {/* {this.displayModal()} */}
        <LocationDetails sendBackModalChange = {this.modalChange.bind(this)} locationInfo = {this.state.moreInfoLocation} modal = {this.state.modal}/>
      {/*   {this.state.modal ?
          // <div className="modalWindow">
          //   <div className="row">
          //     <div className="col s12 m2 l3"></div>
          //     <div className="col s12 m8 l6">
          //       <div className="card">
          //         <div className="card-image">
          //           {this.state.moreInfoLocation.images ?
          //           <img src={this.state.moreInfoLocation.images[0]} />
          //           : null}
          //           <span className="card-title">{this.state.moreInfoLocation.name}</span>
          //         </div>
          //         <div className="card-content modalContent">
          //           <p>{this.state.moreInfoLocation.description}</p>
          //         </div>
          //         <div className="card-action">
          //           <span><button className="btn-floating btn-large waves-effect waves-light blue-grey lighten-2" onClick={this.toggleModal.bind(this)}><i className="material-icons">clear</i></button></span>
          //         </div>
          //       </div>
          //     </div>
          //     <div className="col s12 m2 l3"></div>
          //   </div>
          // </div>
          : null} */}


      </div>
    )
  }
}

// render(<SortableComponent />, document.getElementById('root'));
export default Locations;
