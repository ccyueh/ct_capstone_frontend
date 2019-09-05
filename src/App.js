import React, { Component } from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom';

import Home from './views/home';
import About from './views/about';
import Format from './components/format';
import Header from './components/header';
import Slogan from './components/slogan';
import Footer from './components/footer';
import Timer from './components/timer';
import UploadForm from './components/uploadForm';
import CheckVote from './components/checkVote';

import CreateParty from './views/party/create';
import JoinParty from './views/party/join';
import ViewParty from './views/party/view';
import PartyOptions from './views/party/options';

import AddBottle from './views/bottle/add';
import VoteBottle from './views/bottle/vote';
import RateBottle from './views/bottle/rate';
import ResultBottle from './views/bottle/result';

import ProfileTable from './components/profileTable';
import Profile from './components/profile';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import SECRET_KEY from './config.js';

let jwt = require('jsonwebtoken');

class App extends Component {
  constructor(props) {
    super();

    this.state = {
      token: ''
    }
  }

  handleRegister = async(e) => {
      e.preventDefault();

      let first = e.target.elements.first.value;
      let last = e.target.elements.last.value;
      let email = e.target.elements.email.value;
      let password = e.target.elements.password.value;
      let password2 = e.target.elements.password2.value;

      const URL = 'https://sipper-backend.herokuapp.com/authenticate/register';

      // encrypt a token with the proper payload info to send to our api
      let token = jwt.sign(
        { 'first': first,
          'last': last,
          'email': email,
          'password': password,
          'password2': password2,
        },
        SECRET_KEY,
        { expiresIn: '1h' } // expires in 1 hour
      );

      // send token to register user
      let response = await fetch(URL, {
        'method': 'POST',
        'headers': {
          'Content-Type': 'application/json',
          'token': token
        }
      });

      let data = await response.json();

      // setup message saying registered or error
      if (data.success) {
        alert('You are now registered!');
        this.props.history.push('/login');
      } else {
        alert(data.error);
      }
    }

  handleLogin = async(e) => {
    e.preventDefault();

    let email = e.target.elements.email.value;
    let password = e.target.elements.password.value;

    const URL = 'https://sipper-backend.herokuapp.com/authenticate/login';

    // encrypt a token with the proper payload info to send to our api
    let token = jwt.sign(
      { 'email': email, 'password': password },
      SECRET_KEY,
      { expiresIn: '1h' } // expires in 1 hour
    );

    let response = await fetch(URL, {
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/json',
        'token': token
      }
    })

    let data = await response.json();

    if (data.success) {
      this.setState({
        'token': data.token
      });

      // set token into local storage
      localStorage.setItem('token', data.token);
      this.props.history.push('/');
      window.location.reload();
    } else if (data.error) {
      alert(`${data.error}`);
    } else {
      alert('Sorry, try again.');
    }
  }

  handleLogout = () => {
    localStorage.setItem('token', '');
    this.setState({ 'token': '' });
    this.props.history.push('/login');
    window.location.reload();
  }

  componentWillMount() {
    let token = localStorage.getItem('token');
    if (token) {
      this.setState({ token });
    }
  }

  render() {
    return (
      <div className="App">

        <Header
          token={this.state.token}
          handleLogout={this.handleLogout}
        />

        <Slogan token={this.state.token} />

        <Timer token={this.state.token} />

        <CheckVote token={this.state.token} />

        <Switch>

          <Route
            exact path='/login'
            render={() =>
              <Format token="token" title="Login">
                <LoginForm handleLogin={this.handleLogin} />
              </Format>
            }
          />

          <Route
            exact path='/register'
            render={() =>
              <Format token="token" title="Register">
                <RegisterForm handleRegister={this.handleRegister} />
              </Format>
            }
          />

          <Route
            exact path='/'
            render={() =>
              <Home token={this.state.token} />}
          />
          <Route
            exact path='/about'
            render={() =>
              <About />}
          />
          <Route
            exact path='/party/create'
            render={() =>
              <CreateParty token={this.state.token} />}
          />
          <Route
            exact path='/party/join'
            render={() =>
              <JoinParty token={this.state.token} />}
          />
          <Route
            exact path='/party/view'
            render={() =>
              <ViewParty token={this.state.token} />}
          />
          <Route
            exact path='/party/options'
            render={() =>
              <PartyOptions token={this.state.token} />}
          />
          <Route
            exact path='/bottle/add'
            render={() =>
              <AddBottle token={this.state.token} />}
          />
          <Route
            exact path='/bottle/party'
            render={() =>
              <VoteBottle token={this.state.token} />}
          />
          <Route
            exact path='/bottle/result'
            render={() =>
              <ResultBottle token={this.state.token} />}
          />
          <Route
            exact path='/bottle/rate'
            render={() =>
              <RateBottle token={this.state.token} />}
          />
          <Route
            exact path='/profile'
            render={() =>
              <ProfileTable token={this.state.token} />}
          />
          <Route
            exact path='/profile/edit'
            render={() =>
              <Profile token={this.state.token} />}
          />

        </Switch>

        <Footer token={this.state.token} />
      </div>
    );
  }
}

export default withRouter(App);
