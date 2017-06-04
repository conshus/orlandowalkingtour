import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import base from '../rebase';
// import materializecss from 'materialize-css';
// var $ = window.jQuery = require('jquery');
require('materialize-css/dist/css/materialize.css');
window.jQuery = require('jquery');
window.$ = require('jquery');
require('materialize-css/dist/js/materialize.js');
require('materialize-css/js/init.js');
import owt_logo from "../../public/images/OWT-logo.png";

class Home extends Component {
  constructor (){
    super();
    this.state = {
      user: {},
      isAdmin: false
    }
  }

componentWillUpdate(){
  window.$ = window.jQuery;
  window.$('.collapsible').collapsible();
  console.log('componentWillUpdate')

}

componentWillReceiveProps(){
  window.$ = window.jQuery;
  window.$('.collapsible').collapsible();
  console.log('componentWillReceiveProps')

}
  componentDidMount() {
    window.$ = window.jQuery;
    window.$('.collapsible').collapsible();

    base.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('User is signed in.', user);
        this.setState({
          user: user
        })
      //   base.syncState(`/users/${user.uid}/projects`,{
      //     context: this,
      //     state: 'projects',
      //     asArray: true
      //   })
      //   base.syncState(`/users/${user.uid}/users`,{
      //     context: this,
      //     state: 'users',
      //     asArray: true
      //   })
      // } else {
      //   console.log('User is logged out.')
      //   this.setState({
      //     user: {}
      //   })

        base.fetch('admins',{
          context: this,
          asArray: true,
        }).then(admins => {
          console.log(admins)
          console.log(admins.indexOf(user.uid))
          if (admins.indexOf(user.uid)!==-1){
            this.setState({
              isAdmin: true
            })
          }
        })


       }
    });

  }




  googlelogin (){
    var authHandler = (error, data) => {
      console.log('user', data.user)
      this.setState({
        user: data.user
      })
    }
    //basic
    base.authWithOAuthPopup('google', authHandler);
  }

  twitterlogin (){
    var authHandler = (error, data) => {
      console.log('user', data.user)
      this.setState({
        user: data.user
      })
    }
    //basic
    base.authWithOAuthPopup('twitter', authHandler);
  }

  facebooklogin (){
    var authHandler = (error, data) => {
      console.log('user', data.user)
      this.setState({
        user: data.user
      })
    }
    //basic
    base.authWithOAuthPopup('facebook', authHandler);
  }

  githublogin (){
    var authHandler = (error, data) => {
      console.log('user', data.user)
      this.setState({
        user: data.user
      })
    }
    //basic
    base.authWithOAuthPopup('github', authHandler);
  }

  logout () {
    base.unauth()
    this.setState({
      user: {},
      isAdmin: false
    })
    this.forceUpdate();
  }

  loginOrLogoutButtons (){

    if (this.state.user.uid){
      return <button className="waves-effect waves-light btn"
        onClick={this.logout.bind(this)}>Logout</button>
    } else {
      return (
        <div>
          <h6>to create & save tours:</h6>

            <ul className="collapsible popout" data-collapsible="accordion">
              <li>
                <div className="collapsible-header"><i className="material-icons">filter_drama</i>Login</div>
                <div className="collapsible-body">
                  <span>
                    <button className="waves-effect waves-light btn" onClick={this.googlelogin.bind(this)}><i className="fa fa-google" aria-hidden="true"></i></button>
                    <button className="waves-effect waves-light btn" onClick={this.twitterlogin.bind(this)}><i className="fa fa-twitter" aria-hidden="true"></i></button>
                    <button className="waves-effect waves-light btn" onClick={this.facebooklogin.bind(this)}><i className="fa fa-facebook" aria-hidden="true"></i></button>
                    <button className="waves-effect waves-light btn" onClick={this.githublogin.bind(this)}><i className="fa fa-github" aria-hidden="true"></i></button>
                  </span>
                </div>
              </li>
            </ul>

        </div>
      )
    }
  }

  loggedInUserMenu (){
    if (this.state.user.uid){
      return (
        <span>
            <li className="collection-header"><img className="responsive-img circle userAvatar" src={this.state.user.photoURL} alt="user pic" /><h4>{this.state.user.displayName}</h4></li>
            <li className="collection-item"><div><Link className="waves-effect waves-light btn" to={`/user/${this.state.user.uid}/create`}>Create New Tour</Link></div></li>
            <li className="collection-item"><div><Link className="waves-effect waves-light btn" to={`/user/${this.state.user.uid}/tours`}>View Saved Tours</Link></div></li>
            <li className="collection-item"><div><Link className="waves-effect waves-light btn" to={`/user/${this.state.user.uid}/suggestALocation`}>Suggest a Location</Link></div></li>
        </span>
      )
    }
  }

  adminMenu (){
    if (this.state.isAdmin){
      return (
        <span>
          <li className="collection-item"><div><Link className="waves-effect waves-light btn" to={`/user/${this.state.user.uid}/admin`}>Admin</Link></div></li>
        </span>
      )
    }
  }

  reloadJquery(){
    //window.$ = window.jQuery;
    window.$('.collapsible').collapsible();
    console.log('reloadJquery')
  }

  render() {
    this.reloadJquery()
    return (
      <div className="Home wholeScreen flex hcenter vcenter">
        <div className="homeScreen">
          {/* <h1>get OWT</h1> */}
          <img src={owt_logo} className="responsive-img owtLogo" />
          <h6>Orlando Walking Tours</h6>
          <Link className="waves-effect waves-light btn" to="/tours">Take a Tour</Link>
          <ul className="collection with-header">
            {this.loginOrLogoutButtons()}
            {this.loggedInUserMenu()}
            {this.adminMenu()}
          </ul>
        </div>
      </div>
    )
  }
}
export default Home;
