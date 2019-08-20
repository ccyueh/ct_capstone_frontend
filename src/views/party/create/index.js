import React, { Component } from 'react';
import './index.css';
import { withRouter } from 'react-router-dom';
import Form from '../../../components/form';
import CreatePartyForm from '../../../components/createPartyForm';

class CreateParty extends Component {
  createParty = async(e) => {
    e.preventDefault();

    let token = this.props.token;
    let host_id = JSON.parse(atob(token.split('.')[1])).user_id;
    let data_json = {};

    Object.values(e.target.elements).map(k => { if (k.name.length > 0) data_json[k.name] =  k.value } );
    data_json['host_id'] = host_id;

    const URL = 'http://localhost:5000/api/parties/save';

    let response = await fetch(URL, {
      'method': 'POST',
      'headers': { 'Content-Type': 'application/json' },
      'body': JSON.stringify(data_json)
    })

    let data = await response.json();

    if (data.success) {
      alert(`${data.success}`);
      this.props.history.push('../party/view');
    } else if (data.error) {
      alert(`${data.error}`);
    } else {
      alert('Sorry, try again.');
    }
  }

  render() {
    if (this.props.token) {
      return (
        <Form title="Party Details">
          <CreatePartyForm createParty={this.createParty} />
        </Form>
      );
    } else {
        return (
          <div>You must be logged in to view this page.</div>
        );
    }
  }
}

export default withRouter(CreateParty);
