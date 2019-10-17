import React, { Component } from 'react';
import './index.css';
import { withRouter } from 'react-router-dom';
import Format from '../../components/format';
import callAPI from '../../utils/api.js';

class ResetPass extends Component {
  resetPassword = async(e) => {
    e.preventDefault();

    let data_json = {};

    Object.values(e.target.elements).map(k =>
      { if (k.name.length > 0) data_json[k.name] =  k.value }
    );

    let data = await callAPI(
      'password/reset',
      'POST',
      false,
      data_json
    );

    if (data) {
      this.props.history.push('../login');
      window.location.reload();
    }
  }

  render() {
    return (
      <Format token="token" title="Reset Password">
        <form onSubmit={this.resetPassword}>
          <div className="form-group">
            <label>E-mail</label>
            <input type="email" className="form-control" name="email" />
          </div>
          <button type="submit" className="btn btn-danger">Send New Password</button>
        </form>
      </Format>
    );
  }
}

export default withRouter(ResetPass);
