import React, { Component } from 'react';
import './index.css';
import { Link, withRouter } from 'react-router-dom';

class PartyOptions extends Component {
  constructor(props) {
    super();

    this.state = {
      start: '',
      voting: '',
      reveal: '',
      voting_end: '',
      set_vote: false
    }
  }

  setVotingEnd = () => {
    if (this.state.start > new Date()) {
      if (!window.confirm('Are you sure you want to allow voting?')) {
        return;
      }
    }

    this.setState({ 'set_vote': true });
  }

  startVoting = async(e) => {
    e.preventDefault();

    let data_json = {};

    Object.values(e.target.elements).map(k => { if (k.name.length > 0) data_json[k.name] =  k.value } );
    data_json['voting'] = true;
    let hours = data_json['hours'];
    let minutes = data_json['minutes'];

    let voting_end = new Date();
    let total_minutes = Number(minutes) + Number(60 * hours);
    voting_end.setMinutes(voting_end.getMinutes() + total_minutes);
    data_json['voting_end'] = voting_end;

    const URL = 'http://localhost:5000/api/parties/save';

    let response = await fetch(URL, {
      'method': 'POST',
      'headers': { 'Content-Type': 'application/json' },
      'body': JSON.stringify(data_json)
    })

    let data = await response.json();

    if (data.success) {
      alert(`${data.success}`);
      this.props.history.push({
        pathname: '../bottle/party',
        state: {
          token: this.props.history.location.state.token,
          party: this.props.history.location.state.party,
        }
      });
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
      this.props.history.push({
        pathname: '../bottle/party',
        state: {
          token: this.props.history.location.state.token,
          party: this.props.history.location.state.party,
        }
      });
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
      this.setState({ 'start': new Date(party.start), 'voting': party.voting, 'reveal': party.reveal, 'voting_end': new Date(party.voting_end) });
    }
  }

  render() {
    let token = this.props.history.location.state.token;
    let party = this.props.history.location.state.party;
    console.log(this.state);
    return (
      <div className="container">
        <h1 className={"" + (this.state.voting ? "d-none" : "")}>Options</h1>
        { !this.state.voting && this.state.voting_end > new Date() &&
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
        { !this.state.voting && this.state.voting_end > new Date() &&
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
        { !this.state.voting && this.state.voting_end > new Date() &&
          <button className="btn btn-danger btn-wide" onClick={() => this.setVotingEnd()}>
              Start Voting
          </button>
        }
        {  this.state.set_vote &&
          <form onSubmit={this.startVoting}>
            <div className="voting-end">
              <label>Hours</label>
              <input type="number" className="form-control" name="hours" />
              <label>Minutes</label>
              <input type="number" className="form-control" name="minutes" />
              <input readOnly type="number" name="party_id" value={party.party_id} className="d-none" />
              <button type="submit" className="btn btn-danger">
                Set Voting Period
              </button>
            </div>
          </form>
        }
        { this.state.voting && this.state.voting_end > new Date() && !this.state.reveal &&
          <p className="text-center mt-5">The party is underway!</p>
        }
        { !this.state.reveal && this.state.voting_end < new Date() &&
          <button className="btn btn-danger btn-wide" onClick={() => this.setReveal(party.party_id)}>
              Reveal Bottles
          </button>
        }
        { !this.state.voting && this.state.voting_end > new Date() &&
          <button className="btn btn-danger btn-wide" onClick={() => this.deleteParty(party.party_id)}>
              Cancel Party
          </button>
        }
      </div>
    );
  }
}

export default withRouter(PartyOptions);
