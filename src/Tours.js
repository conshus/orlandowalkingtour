import React, { Component } from 'react';
import base from './rebase';
window.base = base; //Use base from console
//import { collapsible } from 'materialize-css';
import materializecss from 'materialize-css';
import $ from 'jquery';

class Tours extends Component {
  componentDidMount(){
    $('.collapsible').collapsible();
  }
  render() {
    return (
      <div className="Tours">
        <h1>Tours works!</h1>


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
