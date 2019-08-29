import React, { Component } from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom';

import Form from './components/form';
import Header from './components/header';
import Slogan from './components/slogan';
import Footer from './components/footer';
import Timer from './components/timer';

import CreateParty from './views/party/create';
import JoinParty from './views/party/join';
import ViewParty from './views/party/view';
import PartyOptions from './views/party/options';

import AddBottle from './views/bottle/add';
import VoteBottle from './views/bottle/vote';
import RateBottle from './views/bottle/rate';

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
      logged_in: false,
      token: '',
      parties: [],
      current: '',
      last: '',
      voting_end: 0
    }
  }

  handleRegister = async(e) => {
      e.preventDefault();

      let first = e.target.elements.first.value;
      let last = e.target.elements.last.value;
      let email = e.target.elements.email.value;
      let password = e.target.elements.password.value;
      let password2 = e.target.elements.password2.value;

      const URL = 'http://localhost:5000/authenticate/register';

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
        alert('You are now registered');
        this.props.history.push('/login');
      } else {
        alert(data.error);
      }
    }

  handleLogin = async(e) => {
    e.preventDefault();

    let email = e.target.elements.email.value;
    let password = e.target.elements.password.value;

    const URL = 'http://localhost:5000/authenticate/login';

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
        'logged_in': true,
        'token': data.token
      });

      // set token into local storage
      localStorage.setItem('token', data.token);
      this.props.history.push('/');
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
  }

  retrieveParty = async(id, host) => {
    let URL = 'http://localhost:5000/api/parties/retrieve?';

    if (host) {
      URL += 'host_id=' + id;
    } else {
      URL += 'user_id=' + id;
    }

    let response = await fetch(URL, {
      'method': 'GET',
      'headers': { 'Content-Type': 'application/json' }
    })

    let data = await response.json();
    if (data.success) {
      return data.parties;
    } else if (data.error) {
      alert(`${data.error}`);
    } else {
      alert('Sorry, try again.');
    }
  }

  allParties = async(user_id) => {
    let host = await this.retrieveParty(user_id, true);
    let guest = await this.retrieveParty(user_id, false);
    let parties = host.concat(guest);
    return parties;
  }

  currentParty = async(parties) => {
    let current = parties.filter(party => party.voting == true);
    if (current.length > 0) {
      return current[0];
    } else {
      return false;
    }
  }

  lastParty = async(parties) => {
    let revealed = parties.filter(party => party.reveal == true);
    if (revealed.length > 0) {
      revealed.sort(function(a,b) {
        return new Date(b.start) - new Date(a.start);
      });
      return revealed[0];
    } else {
      return false;
    }
  }

  async componentDidMount() {
    let token = localStorage.getItem('token');
    //if (token && this.state.logged_in) {
      let user_id = JSON.parse(atob(token.split('.')[1])).user_id;
      let parties = await this.allParties(user_id);
      let current = await this.currentParty(parties);
      let last = await this.lastParty(parties);
      let voting_end = 0;
      if (current) {
        voting_end = current.voting_end;
      }

      this.setState({ token, parties, current, last, voting_end });
    //}
  }

  render() {
    return (
      <div className="App">

        <Header
          token={this.state.token}
          handleLogout={this.handleLogout}
        />

        <Slogan token={this.state.token} />

        <Timer party={this.state.current} voting_end={this.state.voting_end} />

        <Switch>

          <Route
            exact path='/login'
            render={() =>
              <Form title="Login">
                <LoginForm handleLogin={this.handleLogin} />
              </Form>
            }
          />

          <Route
            exact path='/register'
            render={() =>
              <Form title="Register">
                <RegisterForm handleRegister={this.handleRegister} />
              </Form>
            }
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
              <ViewParty token={this.state.token} parties={this.state.parties} />}
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
              <Profile />}
          />

        </Switch>

        <Footer  token={this.state.token} current={this.state.current} last={this.state.last} />
      </div>
    );
  }
}

export default withRouter(App);
