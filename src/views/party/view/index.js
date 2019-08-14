import React, { Component } from 'react';
import './index.css';
import ViewPartyForm from '../../../components/viewPartyForm';

class ViewParty extends Component {
  viewParty = async(e) => {
    e.preventDefault();

    let URL = 'http://localhost:5000/api/parties/retrieve';

    let url_params = [];
    Object.values(e.target.elements).map(k => { if (k.value.length > 0) url_params.push(k.name + '=' + k.value) });

    URL += '?' + url_params.join('&');

    let response = await fetch(URL, {
      'method': 'GET',
      'headers': { 'Content-Type': 'application/json' }
    })

    let data = await response.json();
    console.log(data);
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
            <h1>View Party Details</h1>
            <ViewPartyForm viewParty={this.viewParty} />
          </div>
        </div>
      </div>
    );
  }
}

export default ViewParty;
