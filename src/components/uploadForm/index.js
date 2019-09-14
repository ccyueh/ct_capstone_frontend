import React, { Component } from 'react';
import './index.css';
import { withRouter } from 'react-router-dom';
import Format from '../format';
import callAPI from '../../utils/api.js';
import getID from '../../utils/getID.js';

class UploadForm extends Component {
  constructor() {
    super();

    this.state = {
      user_id: ''
    }
  }

  handleUploadImage = async(e) => {
    e.preventDefault();

    const URL = 'https://sipper-psql.herokuapp.com/upload';

    let response_json = {};
    response_json['method'] = 'POST';

    let body = new FormData();
    let filetype = this.uploadInput.files[0].name.split('.')[1];

    let filename = this.props.img_type.toLowerCase() + '_' + this.state.user_id;
    if (this.props.party_id) {
      filename += '_' + this.props.party_id;
    }
    filename += '.' + filetype;

    body.append('file', this.uploadInput.files[0], filename);
    response_json['body'] = body;

    let response = await fetch(URL, response_json);
    let data = await response.json();
    if (data.success) {
      let upload = await this.imageDB(filename);
      if (upload) {
        window.location.reload();
      }
    } else if (data.error) {
      alert(`${data.error}`);
    } else {
      alert('Sorry, try again.');
    }
  }

  imageDB = async(filename) => {
    let url = 'api/' + (this.props.img_type == "Profile" ? "users" : "bottles" ) + '/img/save';
    let body = {};
    let img_col = (this.props.img_type == "Profile" ? "profile_img" : "label_img" );
    body[img_col] = 'static/images/' + filename;
    body['user_id'] = this.state.user_id;
    if (this.props.party_id) {
      body['party_id'] = this.props.party_id
    }

    let data = await callAPI(
      url,
      'POST',
      false,
      body
    );

    if (data) {
      return data;
    }
  }

  componentDidMount() {
    if (this.props.token) {
      let user_id = getID(this.props.token);
      this.setState({ user_id });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleUploadImage}>
        <input ref={(ref) => { this.uploadInput = ref; }} type="file" className="form-control" />
        <button className="btn btn-danger">Upload Image</button>
      </form>
    );
  }
}

export default withRouter(UploadForm);
