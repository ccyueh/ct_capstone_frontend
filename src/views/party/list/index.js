import React, { Component } from 'react';
import './index.css';

class ListParty extends Component {
  findParty = async(host) => {
    //e.preventDefault();

    let token = this.props.token;
    let id = JSON.parse(atob(token.split('.')[1])).user_id;
    let URL = 'http://localhost:5000/api/parties/retrieve?';

    if (host) {
      URL += 'host_id=' + id;
    } else {
      URL += 'user_id=' + id;
    }

    let response = await fetch(URL, {
      'method': 'GET',
      'headers': { 'Content-Type': 'application/json' }
    })

    let data = await response.json();
    if (data.success) {
      return data.parties;
    } else if (data.error) {
      alert(`${data.error}`);
    } else {
      alert('Sorry, try again.');
    }
  }

  filterParty = async(host, timeframe) => {
    let parties = await this.findParty(host);
    let now = new Date();

    if (timeframe == 'past') {
      parties = parties.filter(party => new Date(party.end) - now < 0);
    } else {
      parties = parties.filter(party => new Date(party.start) - now > 0);
    }
    console.log(parties);
    return parties;
  }

  componentDidMount() {
    this.filterParty(true, 'upcoming');
    this.filterParty(true, 'past');
  }

  render() {
    return (
      <button onClick={() => this.filterParty(true, 'past')}>Click</button>
    );
  }
}

export default ListParty;
