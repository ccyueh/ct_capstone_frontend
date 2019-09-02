import React, { Component } from 'react';
import './index.css';
import { Link, withRouter } from 'react-router-dom';
import Format from '../../../components/format';
import SetVoteForm from '../../../components/setVoteForm';
import callAPI from '../../../utils/api.js';

class PartyOptions extends Component {
  constructor(props) {
    super();

    this.state = {
      set_vote: false
    }
  }

  setVotingEnd = (start) => {
    if (start > new Date()) {
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
    let total_minutes = Number(minutes) + Number(60 * Number(hours));

    if (total_minutes == 0) {
      alert('Please choose a valid voting period.')
      window.location.reload();
    }

    voting_end.setMinutes(voting_end.getMinutes() + total_minutes);
    data_json['voting_end'] = voting_end;

    let data = await callAPI(
      'api/parties/save',
      'POST',
      false,
      data_json
    );

    if (data.success) {
      this.props.history.push('../bottle/party');
      window.location.reload();
    }
  }

  setReveal = async(party, party_id) => {
    let data = await callAPI(
      'api/parties/save',
      'POST',
      false,
      { 'party_id': party_id,
        'reveal': true
      },
    );

    if (data) {
      party['reveal'] = true;
      this.props.history.push({
        pathname: '../bottle/result',
        state: { party: party }
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
      this.props.history.push('../party/view');
    }
  }

  render() {
    if (!this.props.history.location.state) {
      this.props.history.push('/');
      window.location.reload();
    }

    let party = this.props.history.location.state.party;
    let start = new Date(party.start);
    let voting_end = new Date(party.voting_end);
    return (
      <Format title={party.voting || party.reveal ? "" : "Options"}>
        { !party.voting &&
          voting_end > new Date() &&
          <Link to={{
            pathname: "../party/create",
            state: { party: party }
          }}>
            <button className="btn btn-danger btn-wide">
                Edit Party Details
            </button>
          </Link>
        }
        { !party.voting &&
          voting_end > new Date() &&
          <Link to={{
            pathname: "../party/guests",
            state: { party_id: party.party_id }
          }}>
            <button className="btn btn-danger btn-wide">
              Edit Guest List
            </button>
          </Link>
        }
        { !party.voting &&
          voting_end > new Date() &&
          <button
            className="btn btn-danger btn-wide"
            onClick={() => this.setVotingEnd(start)}
          >
              Start Voting
          </button>
        }
        {  this.state.set_vote &&
          <SetVoteForm
            startVoting={this.startVoting}
            party_id={party.party_id}
          />
        }
        { party.voting &&
          voting_end > new Date() &&
          !party.reveal &&
          <p className="text-center mt-5">The party is underway!</p>
        }
        { !party.reveal &&
          voting_end < new Date() &&
          <button
           className="btn btn-danger btn-wide"
           onClick={() => this.setReveal(party, party.party_id)}
          >
              Reveal Bottles
          </button>
        }
        { !party.voting &&
          voting_end > new Date() &&
          <button
            className="btn btn-danger btn-wide"
            onClick={() => this.deleteParty(party.party_id)}
          >
              Cancel Party
          </button>
        }
      </Format>
    );
  }
}

export default withRouter(PartyOptions);
