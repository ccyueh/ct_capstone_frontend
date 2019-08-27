import React, { Component } from 'react';
import './index.css';
import { Link, withRouter } from 'react-router-dom';

class PartyOptions extends Component {
  constructor() {
    super();

    this.state = {
      reveal: false,
    }
  }

  deleteParty = async(party_id) => {
    if (!window.confirm('Are you sure you want to cancel this party?')) {
      return;
    }

    let URL = 'http://localhost:5000/api/parties/delete?party_id=';
    URL += party_id;

    let response = await fetch(URL, {
      'method': 'DELETE',
      'headers': { 'Content-Type': 'application/json' }
    })

    let data = await response.json();

    if (data.success) {
      alert(`${data.success}`);
      this.props.history.push('../parties/view');
    } else if (data.error) {
      alert(`${data.error}`);
    } else {
      alert('Sorry, try again.');
    }
  }

  render() {
    let token = this.props.history.location.state.token;
    let party = this.props.history.location.state.party;
    return (
      <div className="container">
        <h1>Options</h1>
        <Link to={{
          pathname: "../party/create",
          state: {
            token: token,
            party: party
          }
        }}>
          <button className="btn btn-danger btn-wide mt-4">
              Edit Party Details
          </button>
        </Link>
        <Link to={{
          pathname: "../party/guests",
          state: {
            token: token,
            party_id: party.party_id
          }
        }}>
          <button className="btn btn-danger btn-wide">
              Edit Guest List
          </button>
        </Link>
        <Link to={{
          pathname: "../party/terms",
          state: {
            token: token,
            party: party
          }
        }}>
          <button className="btn btn-danger btn-wide">
            Customize Tasting Terms
          </button>
        </Link>
        <button className="btn btn-danger btn-wide" onClick={() => this.startVoting(party.party_id)}>
            Start Voting
        </button>
        { this.state.reveal &&
          <button className="btn btn-danger btn-wide" onClick={() => this.setReveal(party.party_id)}>
              Reveal Bottles
          </button>
        }
        <button className="btn btn-danger btn-wide" onClick={() => this.deleteParty(party.party_id)}>
            Cancel Party
        </button>
      </div>
    );
  }
}

export default withRouter(PartyOptions);
