import React, { Component } from 'react';
import './index.css';
import JoinPartyForm from '../../../components/joinPartyForm';

class JoinParty extends Component {
  joinParty = async(e) => {
    e.preventDefault();

    let data_json = {};
    Object.values(e.target.elements).map(k => { if (k.name.length > 0) data_json[k.name] =  k.value } );

    let URL = 'http://localhost:5000/api/guests/save';

    let response = await fetch(URL, {
      'method': 'POST',
      'headers': { 'Content-Type': 'application/json' },
      'body': JSON.stringify(data_json)
    })

    let data = await response.json();

    if (data.success) {
      alert(`${data.success}`);
    } else if (data.error) {
      alert(`${data.error}`);
    } else {
      alert('Sorry, try again.');
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1>Join a Party</h1>
            <JoinPartyForm joinParty={this.joinParty} />
          </div>
        </div>
      </div>
    );
  }
}

export default JoinParty;
