import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Form from './components/form';
import Header from './components/header';
//import Login from './views/user/login';
import CreateParty from './views/party/create';
import JoinParty from './views/party/join';
import ViewParty from './views/party/view';
import AddBottle from './views/bottle/add';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import SECRET_KEY from './config.js';

let jwt = require('jsonwebtoken');


class App extends Component {
  constructor() {
    super();

    this.state = {
      logged_in: false,
      token: '',
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
        alert('You are now registered')
      } else {
        alert(data.error)
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
      //console.log(JSON.parse(atob(token.split('.')[1])));
      //alert(`${data.success}`);
    } else if (data.error) {
      alert(`${data.error}`);
    } else {
      alert('Sorry, try again.');
    }
  }

  handleLogout = () => {
    localStorage.setItem('token', '');
    this.setState({ 'token': '' });
    //alert('You have logged out.');
  }

  render() {
    return (
      <div className="App">

        <Header
          token={this.state.token}
          handleLogout={this.handleLogout}
        />

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

          <Route exact path='/party/create' render={() => <CreateParty token={this.state.token} />} />
          <Route exact path='/bottle/add' render={() => <AddBottle />} />
          <Route exact path='/party/join' render={() => <JoinParty token={this.state.token} />} />
          <Route exact path='/party/view' render={() => <ViewParty token={this.state.token} />} />

        </Switch>

      </div>
    );
  }
}

export default App;
