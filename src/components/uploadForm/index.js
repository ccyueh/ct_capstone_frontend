import React, { Component } from 'react';
import './index.css';
import { withRouter } from 'react-router-dom';
import callAPI from '../../utils/api.js';
import getID from '../../utils/getID.js';

class UploadForm extends Component {
  handleUploadImage = async(e) => {
    e.preventDefault();

    const URL = 'https://sipper-psql.herokuapp.com/upload';

    let response_json = {};
    response_json['method'] = 'POST';

    let body = new FormData();
    if (this.uploadInput.files[0]) {
      body.append('file', this.uploadInput.files[0]);
      response_json['body'] = body;

      let response = await fetch(URL, response_json);
      let data = await response.json();
      if (data.success) {
        let upload = await this.imageDB(data.filename);
        if (upload) {
          window.location.reload();
        }
      } else if (data.error) {
        alert(`${data.error}`);
      } else {
        alert('Sorry, try again.');
      }
    }
  }

  imageDB = async(filename) => {
    let body = {
      'user_id': getID(this.props.token),
      'party_id': this.props.party_id,
      'label_img': filename
    };

    let data = await callAPI(
      'api/bottles/img/save',
      'POST',
      false,
      body
    );

    if (data) {
      return data;
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
