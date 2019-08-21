import React, { Component } from 'react';
import './index.css';
import UserTable from '../../components/userTable';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      user: {}
    }
  }

  retrieveUser = async(e) => {
    let token = this.props.token;
    let user_id = JSON.parse(atob(token.split('.')[1])).user_id;
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

  async componentDidMount() {
    let user = await this.retrieveUser();
    this.setState({ user });
  }

  render() {
    return (
      <UserTable user={this.state.user} />
    );
  }
}

export default Profile;
