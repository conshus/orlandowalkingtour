import React, { Component } from 'react';
import base from '../rebase';
window.base = base; //Use base from console
//import { collapsible } from 'materialize-css';
import materializecss from 'materialize-css';
import $ from 'jquery';
import UserMenu from './UserMenu'
import { Link } from 'react-router-dom';

class Tours extends Component {
  constructor(){
    super();
    this.state = {
      tours: []
    }
  }

  componentDidMount(){
    $('.collapsible').collapsible();

    base.syncState(`/tours/`,{
      context: this,
      state: 'tours',
      asArray: true,
    })
  }

  listTours(){
    return(
      <div>
        <h1>tours</h1>
        {console.log('this.state.tours',this.state.tours)}
        {this.state.tours.map((tour, index) => {
          console.log(tour)
          return(
            <div key={`tour-${index}`}>
              <h1><Link to={`/tour/${tour.key}`} className="waves-effect waves-light btn">{tour.tourName}</Link></h1>
            </div>

          )
        })}
      </div>
    )
  }
  render() {
    return (
      <div className="Tours">
        <UserMenu />
        <h1>Tours works!</h1>
        {this.listTours()}


        <ul className="collapsible" data-collapsible="accordion">
          <li>
            <div className="collapsible-header"><i className="material-icons">filter_drama</i>First</div>
            <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
          </li>
          <li>
            <div className="collapsible-header"><i className="material-icons">place</i>Second</div>
            <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
          </li>
          <li>
            <div className="collapsible-header"><i className="material-icons">whatshot</i>Third</div>
            <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
          </li>
        </ul>



      </div>
    )
  }
}

export default Tours;
