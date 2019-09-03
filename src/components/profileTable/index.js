import React, { Component } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import Format from '../format';
import UploadForm from '../uploadForm';
import callAPI from '../../utils/api.js';
import getID from '../../utils/getID.js';

class ProfileTable extends Component {
  constructor() {
    super();

    this.state = {
      user_id: '',
      first: '',
      last: '',
      profile_img: '',
      show_form: false
    }
  }

  retrieveUser = async(user_id) => {
    let data = await callAPI(
      'api/users/retrieve',
      'GET',
      {'user_id': user_id},
      false
    );

    if (data) {
      return data.user;
    }
  }

  async componentDidMount() {
    let user_id = getID(this.props.token);
    let user = await this.retrieveUser(user_id);

    this.setState({
      user_id,
      'first': user.first_name,
      'last': user.last_name,
      'email': user.email,
      'profile_img': user.profile_img
    });
  }

  render() {
    return (
      <Format title="Your Profile">
        <div className="img-container">
          <img src={'https://sipper-backend.herokuapp.com/' + this.state.profile_img} />
        </div>
        { !this.state.show_form &&
          <div>
            <p><b>First Name:</b> {this.state.first}</p>
            <p><b>Last Name:</b> {this.state.last}</p>
            <p><b>E-mail:</b> {this.state.email}</p>
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
            <button className="btn btn-danger" onClick={() => this.setState({ 'show_form': true })}>
              Upload Profile Picture
            </button>
          </div>
        }
        { this.state.show_form &&
          <UploadForm token={this.props.token} img_type="Profile" party_id={false} />
        }
      </Format>
    );
  }
}

export default ProfileTable;
