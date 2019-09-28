import React, { Component } from 'react';
import './index.css';
import { Link, withRouter } from 'react-router-dom';
import Format from '../../../components/format';
import callAPI from '../../../utils/api.js';

class ResetVote extends Component {
  resetVoting = async(e) => {
    e.preventDefault();

    let data_json = {};

    Object.values(e.target.elements).map(k =>
      { if (k.name.length > 0) data_json[k.name] =  k.value }
    );
    data_json['voting'] = false;
    data_json['reveal'] = false;

    let voting_end = new Date(Date.now() + 365*24*60*60*1000);
    data_json['voting_end'] = voting_end;

    let data = await callAPI(
      'api/parties/save',
      'POST',
      false,
      data_json
    );

    if (data) {
      this.props.history.push('/');
      window.location.reload();
    }
  }

  render() {
    return (
      <Format token={this.props.token} title="Reset Voting">
        <form onSubmit={this.resetVoting}>
          <div className="form-group">
            <label>Party ID</label>
            <input type="number" className="form-control" name="party_id" />
          </div>
          <button type="submit" className="btn btn-danger">Reset Voting</button>
        </form>
      </Format>
    );
  }
}

export default withRouter(ResetVote);
