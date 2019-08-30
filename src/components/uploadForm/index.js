import React, { Component } from 'react';
import './index.css';
import callAPI from '../../utils/api.js';

class UploadForm extends Component {
  handleUploadImage = async(e) => {
    e.preventDefault();

    const URL = 'http://localhost:5000/upload';

    let response_json = {};
    response_json['method'] = 'POST';

    let body = new FormData();
    let filetype = this.uploadInput.files[0].name.split('.')[1];
    let filename = this.props.img_type + '_' + this.props.id + '.' + filetype;
    body.append('file', this.uploadInput.files[0], filename);
    response_json['body'] = body;

    let response = await fetch(URL, response_json);
    let data = await response.json();
    if (data.success) {
      return data;
    } else if (data.error) {
      alert(`${data.error}`);
    } else {
      alert('Sorry, try again.');
    }
  }

  render() {
    return (
      <form onSubmit={this.handleUploadImage}>
        <div>
          <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
          </div>
        <br />
        <div>
          <button>Upload</button>
        </div>
      </form>
    );
  }
}

export default UploadForm;
