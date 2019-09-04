import React, { Component } from 'react';
import './index.css';
import Format from '../format';
import { withRouter } from 'react-router-dom';
import SECRET_KEY from '../../config.js';

let jwt = require('jsonwebtoken');

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      user_id: '',
      first: '',
      last: ''
    }
  }

  editProfile = async(e) => {
      e.preventDefault();

      let first = e.target.elements.first.value;
      let last = e.target.elements.last.value;
      let password = e.target.elements.password.value;
      let password2 = e.target.elements.password2.value;

      const URL = 'https://sipper-backend.herokuapp.com/api/users/save';

      // encrypt a token with the proper payload info to send to our api
      let token = jwt.sign(
        { 'user_id': this.state.user_id,
          'first': first,
          'last': last,
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

      if (data.success) {
        this.props.history.push('../profile');
      } else {
        alert(data.error);
      }
    }

  async componentDidMount() {
    let props = this.props.history.location.state;

    this.setState({
      'user_id': props.user_id,
      'first': props.first,
      'last': props.last
    });
  }

  render() {
    return (
      <Format token={this.props.token} title="Profile">
      <form onSubmit={this.editProfile}>
        <div className="form-group">
          <label>First Name</label>
          <input className="form-control" type="text" name="first" defaultValue={this.state.first} />
          <label>Last Name</label>
          <input className="form-control" type="text" name="last" defaultValue={this.state.last} />
          <label>New Password</label>
          <input className="form-control" type="password" name="password" />
          <label>Re-enter New Password</label>
          <input className="form-control" type="password" name="password2" />
        </div>
        <input type="submit" className="btn btn-danger" value="Update Profile" />
      </form>
      </Format>
    );
  }
}

export default withRouter(Profile);
