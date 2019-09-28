import React, { Component } from 'react';
import './index.css';
import { withRouter } from 'react-router-dom';
import Format from '../../../components/format';
import JoinPartyForm from '../../../components/joinPartyForm';
import callAPI from '../../../utils/api.js';
import getID from '../../../utils/getID.js';

class JoinParty extends Component {
  joinParty = async(e) => {
    e.preventDefault();

    let data_json = {};
    Object.values(e.target.elements).map(k => { if (k.name.length > 0) data_json[k.name] =  k.value } );
    data_json['user_id'] = getID(this.props.token);

    let data = await callAPI(
      'api/guests/save',
      'POST',
      false,
      data_json
    );

    if (data) {
      this.props.history.push('../party/view');
    } 
  }

  render() {
    return (
      <Format token={this.props.token} title="Accept an Invite">
        <JoinPartyForm joinParty={this.joinParty} />
      </Format>
    );
  }
}

export default withRouter(JoinParty);
