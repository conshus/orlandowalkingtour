import React, { Component } from 'react';
import base from '../rebase';
import UserMenu from './UserMenu';
import LocationDetails from './LocationDetails';
import materializecss from 'materialize-css';
var $ = window.jQuery = require('jquery');

class Admin extends Component {
  componentDidMount(){
    window.$ = window.jQuery;
    $('ul.tabs').tabs();
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

  render(){
    return(
      <div className="Admin">
        <UserMenu />
        <h1>Admin Works!</h1>
      </div>
    )
  }
}
export default Admin;
