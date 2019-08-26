import React, { Component } from 'react';
import './index.css';
import { Link } from 'react-router-dom';

class ProfileTable extends Component {
  constructor() {
    super();

    this.state = {
      user_id: '',
      first: '',
      last: '',
      profile_img: ''
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

  async componentDidMount() {
    let token = this.props.token;
    let user_id = JSON.parse(atob(token.split('.')[1])).user_id;
    let user = await this.retrieveUser(user_id);

    this.setState({
      'user_id': user_id,
      'first': user.first_name,
      'last': user.last_name,
      'profile_img': user.profile_img
    });
  }

  render() {
    console.log(this.state.profile_img);
    return (
      <div className="container">
        <h2>Your Profile</h2>
        <p><b>First Name:</b> {this.state.first}</p>
        <p><b>Last Name:</b> {this.state.last}</p>
        <div className="img-container">
          <img src={this.state.profile_img} />
        </div>
        <Link to={{
          pathname: "./profile/edit",
          state: {
            token: this.props.token,
            user_id: this.state.user_id,
            first: this.state.first,
            last: this.state.last
          }
        }}>
          <button className="btn btn-danger">
            Edit Profile
          </button>
        </Link>
      </div>
    );
  }
}

export default ProfileTable;
