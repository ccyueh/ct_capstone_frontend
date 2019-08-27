import React, { Component } from 'react';
import './index.css';
import { Link, withRouter } from 'react-router-dom';

class PartyOptions extends Component {
  constructor(props) {
    super();

    this.state = {
      voting: '',
      reveal: '',
    }
  }

  startVoting = async(party_id) => {
    if (!window.confirm('Are you sure you want to allow voting?')) {
      return;
    }

    const URL = 'http://localhost:5000/api/parties/save';

    let response = await fetch(URL, {
      'method': 'POST',
      'headers': { 'Content-Type': 'application/json' },
      'body': JSON.stringify({
        'party_id': party_id,
        'voting': true
      })
    })

    let data = await response.json();

    if (data.success) {
      alert(`${data.success}`);
      this.setState({ 'voting': true });
      this.props.history.push('../');
    } else if (data.error) {
      alert(`${data.error}`);
    } else {
      alert('Sorry, try again.');
    }
  }

  setReveal = async(party_id) => {
    const URL = 'http://localhost:5000/api/parties/save';

    let response = await fetch(URL, {
      'method': 'POST',
      'headers': { 'Content-Type': 'application/json' },
      'body': JSON.stringify({
        'party_id': party_id,
        'voting': false,
        'reveal': true
      })
    })

    let data = await response.json();

    if (data.success) {
      alert(`${data.success}`);
      this.setState({ 'reveal': true });
      this.props.history.push('../bottle/party');
    } else if (data.error) {
      alert(`${data.error}`);
    } else {
      alert('Sorry, try again.');
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

  retrieveStatus = async(party_id) => {
    let URL = 'http://localhost:5000/api/parties/retrieve?party_id=';
    URL += party_id;

    let response = await fetch(URL, {
      'method': 'GET',
      'headers': { 'Content-Type': 'application/json' }
    })

    let data = await response.json();
    if (data.success) {
      if (data.parties.length > 0) {
        return data.parties;
      } else {
        return {};
      }
    } else if (data.error) {
      alert(`${data.error}`);
    } else {
      alert('Sorry, try again.');
    }
  }

  async componentDidMount() {
    if (this.props.history.location.state.party) {
      let party = await this.retrieveStatus(this.props.history.location.state.party.party_id);
      party = party[0];
      this.setState({ 'voting': party.voting, 'reveal': party.reveal });
    }
  }

  render() {
    let token = this.props.history.location.state.token;
    let party = this.props.history.location.state.party;
    return (
      <div className="container">
        <h1>Options</h1>
        { !this.state.voting &&
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
        }
        { !this.state.voting &&
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
        }
        { !this.state.voting &&
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
        }
        { !this.state.voting &&
          <button className="btn btn-danger btn-wide" onClick={() => this.startVoting(party.party_id)}>
              Start Voting
          </button>
        }
        { !this.state.reveal &&
          <button className="btn btn-danger btn-wide" onClick={() => this.setReveal(party.party_id)}>
              Reveal Bottles
          </button>
        }
        { !this.state.voting &&
          <button className="btn btn-danger btn-wide" onClick={() => this.deleteParty(party.party_id)}>
              Cancel Party
          </button>
        }
      </div>
    );
  }
}

export default withRouter(PartyOptions);
