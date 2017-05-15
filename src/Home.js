import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import base from './rebase';
window.base = base; //Use base from console

class Home extends Component {
  constructor (){
    super();
    this.state = {
      user: {},
    }
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
      user: {}
    })
  }

  loginOrLogoutButtons (){
    if (this.state.user.uid){
      return <button className="waves-effect waves-light btn"
        onClick={this.logout.bind(this)}>Logout</button>
    } else {
      return (
        <div>
          <h6>Login in to create & save tours</h6>
          <button className="waves-effect waves-light btn" onClick={this.googlelogin.bind(this)}><i className="fa fa-google" aria-hidden="true"></i> Login</button>
          <button className="waves-effect waves-light btn" onClick={this.twitterlogin.bind(this)}><i className="fa fa-twitter" aria-hidden="true"></i> Login</button>
          <button className="waves-effect waves-light btn" onClick={this.facebooklogin.bind(this)}><i className="fa fa-facebook" aria-hidden="true"></i> Login</button>
          <button className="waves-effect waves-light btn" onClick={this.githublogin.bind(this)}><i className="fa fa-github" aria-hidden="true"></i> Login</button>
        </div>
      )
    }
  }


  welcome () {
    if (base.auth().currentUser){
      return (<button
        onClick={this.logout.bind(this)}>Logout</button>
      )
    } else {
      return <button>Login</button>
    }
  }


  render() {
    return (
      <div className="Home wholeScreen flex hcenter vcenter">
        <div>
          <h1>Home works!</h1>
          <Link className="waves-effect waves-light btn" to="/tours">Take a Tour</Link>
          {this.loginOrLogoutButtons()}
        </div>
      </div>
    )
  }
}
export default Home;
