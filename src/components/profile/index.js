import React, { Component } from 'react';
import './index.css';
import Form from '../form';
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

  retrieveUser = async(user_id) => {
    let URL = 'http://localhost:5000/api/users/retrieve?user_id=';
    URL += user_id;

    let response = await fetch(URL, {
      'method': 'GET',
      'headers': { 'Content-Type': 'application/json' }
    })

    let data = await response.json();
    if (data.success) {
      return data.user;
    } else if (data.error) {
      alert(`${data.error}`);
    } else {
      alert('Sorry, try again.');
    }
  }

  editProfile = async(e) => {
      e.preventDefault();

      let first = e.target.elements.first.value;
      let last = e.target.elements.last.value;
      let password = e.target.elements.password.value;
      let password2 = e.target.elements.password2.value;

      const URL = 'http://localhost:5000/api/users/save';

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
        alert('Profile edited.');
      } else {
        alert(data.error);
      }
    }

  async componentDidMount() {
    let token = this.props.token;
    let user_id = JSON.parse(atob(token.split('.')[1])).user_id;
    let user = await this.retrieveUser(user_id);

    this.setState({
      'user_id': user_id,
      'first': user.first_name,
      'last': user.last_name
    });
  }

  render() {
    return (
      <Form title="Profile">
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
        <input type="submit" className="btn btn-primary" value="Edit Profile" />
      </form>
      </Form>
    );
  }
}

export default Profile;
