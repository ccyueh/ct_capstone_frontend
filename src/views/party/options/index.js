import React, { Component } from 'react';
import './index.css';
import { Link, withRouter } from 'react-router-dom';
import SetVoteForm from '../../../components/setVoteForm';
import callAPI from '../../../utils/api.js';

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

    Object.values(e.target.elements).map(k =>
      { if (k.name.length > 0) data_json[k.name] =  k.value }
    );
    data_json['voting'] = true;
    let hours = data_json['hours'];
    let minutes = data_json['minutes'];

    let voting_end = new Date();
    let total_minutes = Number(minutes) + Number(60 * hours);
    voting_end.setMinutes(voting_end.getMinutes() + total_minutes);
    data_json['voting_end'] = voting_end;

    let data = await callAPI(
      'api/parties/save',
      'POST',
      false,
      data_json
    );

    if (data.success) {
      this.props.history.push({
        pathname: '../bottle/party',
        state: {
          token: this.props.history.location.state.token,
          party: this.props.history.location.state.party,
        }
      });
    }
  }

  setReveal = async(party_id) => {
    let data = await callAPI(
      'api/parties/save',
      'POST',
      false,
      { 'party_id': party_id,
        'reveal': true
      },
    );

    if (data) {
      this.props.history.push({
        pathname: '../bottle/party',
        state: {
          token: this.props.history.location.state.token,
          party: this.props.history.location.state.party,
        }
      });
    }
  }

  deleteParty = async(party_id) => {
    if (!window.confirm('Are you sure you want to cancel this party?')) {
      return;
    }

    let data = await callAPI(
      'api/parties/delete',
      'DELETE',
      {'party_id': party_id},
      false
    );

    if (data) {
      this.props.history.push({
        pathname: '../party/view',
        state: {
          token: this.props.history.location.state.token
        }
      });
    }
  }

  retrieveStatus = async(party_id) => {
    let data = await callAPI(
      'api/parties/retrieve',
      'GET',
      {'party_id': party_id},
      false
    );

    if (data) {
      if (data.parties.length > 0) {
        return data.parties[0];
      }
    }
  }

  // not sure this is necessary since party should contain all info
  async componentDidMount() {
    if (this.props.history.location.state.party) {
      let party = await this.retrieveStatus(this.props.history.location.state.party.party_id);
      if (party) {
        this.setState({
          'start': new Date(party.start),
          'voting': party.voting,
          'reveal': party.reveal,
          'voting_end': new Date(party.voting_end)
        });
      }
    }
  }

  render() {
    let token = this.props.history.location.state.token;
    let party = this.props.history.location.state.party;
    return (
      <div className="container">
        <h1 className={"" + (this.state.voting || this.state.reveal ? "d-none" : "")}>Options</h1>
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
          <SetVoteForm startVoting={this.startVoting} party_id={party.party_id} />
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
