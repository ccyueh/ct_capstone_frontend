import React, { Component } from 'react';
import './index.css';
import Format from '../format';
import callAPI from '../../utils/api.js';

class UploadForm extends Component {
  handleUploadImage = async(e) => {
    e.preventDefault();

    const URL = 'http://localhost:5000/upload';

    let response_json = {};
    response_json['method'] = 'POST';

    let body = new FormData();
    let filetype = this.uploadInput.files[0].name.split('.')[1];
    let filename = this.props.img_type.toLowerCase() + '_' + this.props.id + '.' + filetype;
    body.append('file', this.uploadInput.files[0], filename);
    response_json['body'] = body;

    let response = await fetch(URL, response_json);
    let data = await response.json();
    if (data.success) {
      this.imageDB(filename);
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
    let id_col = (this.props.img_type == "Profile" ? "user_id" : "bottle_id" );
    body[id_col] = this.props.id;

    let data = await callAPI(
      url,
      'POST',
      false,
      body
    );
  }

  render() {
    return (
      <Format title={"Upload " + this.props.img_type + " Image"}>
        <form onSubmit={this.handleUploadImage}>
          <input ref={(ref) => { this.uploadInput = ref; }} type="file" className="form-control" />
          <button className="btn btn-danger">Upload</button>
        </form>
      </Format>
    );
  }
}

export default UploadForm;
