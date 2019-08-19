import React, { Component } from 'react';
import './index.css';
import PartyCard from '../../../components/partyCard';

class DisplayParty extends Component {
  constructor() {
    super();

    this.state = {
      parties: []
    }
  }

  retrieveParty = async(host) => {
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

  filterParty = async(host, past) => {
    let parties = await this.retrieveParty(host);
    let now = new Date();

    if (past) {
      parties = parties.filter(party => new Date(party.end) - now < 0);
    } else {
      parties = parties.filter(party => new Date(party.start) - now > 0);
    }

    this.setState({ parties });
  }

  componentDidMount() {
    this.filterParty(this.props.host, this.props.past);
  }

  render() {
    let parties = this.state.parties;
    return (
      parties.map(party => <PartyCard key={party.party_id} party={party} host={this.props.host} />)
    );
  }
}

export default DisplayParty;
