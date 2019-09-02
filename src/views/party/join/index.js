import React, { Component } from 'react';
import './index.css';
import { withRouter } from 'react-router-dom';
import Format from '../../../components/format';
import JoinPartyForm from '../../../components/joinPartyForm';

class JoinParty extends Component {
  joinParty = async(e) => {
    e.preventDefault();

    let token = this.props.token;
    let user_id = JSON.parse(atob(token.split('.')[1])).user_id;
    let data_json = {};

    Object.values(e.target.elements).map(k => { if (k.name.length > 0) data_json[k.name] =  k.value } );
    data_json['user_id'] = user_id;

    const URL = 'http://localhost:5000/api/guests/save';

    let response = await fetch(URL, {
      'method': 'POST',
      'headers': { 'Content-Type': 'application/json' },
      'body': JSON.stringify(data_json)
    })

    let data = await response.json();

    if (data.success) {
      this.props.history.push('../party/view');
    } else if (data.error) {
      alert(`${data.error}`);
    } else {
      alert('Sorry, try again.');
    }
  }

  render() {
    return (
      <Format title="Accept an Invite">
        <JoinPartyForm joinParty={this.joinParty} />
      </Format>
    );
  }
}

export default withRouter(JoinParty);
