import React, { Component } from 'react';
import base from '../rebase';
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
            <div key={`tour-${index}`} className="col s12 m4 l3">


              <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                  {/* <img className="activator" src="images/office.jpg" /> */}
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">{tour.tourName}</span>
                  <p>Created by</p>
                  <p><img className="responsive-img circle userAvatarSmall" src={tour.creatorPhoto} alt="user pic" />{tour.creator}</p>
                  <Link to={`/tour/${tour.key}`} className="waves-effect waves-light btn">Select this Tour</Link>
                </div>
              </div>

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
        <div className="row">
          {this.listTours()}
        </div>
{/*

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
        </ul> */}



      </div>
    )
  }
}

export default Tours;
