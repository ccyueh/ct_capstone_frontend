import React, { Component } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import Format from '../format';
import callAPI from '../../utils/api.js';
import getID from '../../utils/getID.js';

class ProfileTable extends Component {
  constructor() {
    super();

    this.state = {
      user_id: '',
      first: '',
      last: '',
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
      'email': user.email
    });
  }

  render() {
    return (
      <Format token={this.props.token} title="Your Profile">
        { !this.state.show_form &&
          this.state.user_id &&
          <div className="mw-table">
            <p>
              <span className="table-label">First Name:</span>
              {this.state.first}
            </p>
            <p>
              <span className="table-label">Last Name:</span>
              {this.state.last}
            </p>
            <p>
              <span className="table-label">E-mail:</span>
              {this.state.email}
            </p>
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
        }
      </Format>
    );
  }
}

export default ProfileTable;
