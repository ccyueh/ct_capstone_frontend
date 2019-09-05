import React, { Component } from 'react';
import './index.css';
import { withRouter } from 'react-router-dom';
import Countdown from 'react-countdown-now';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import callAPI from '../../utils/api.js';
import getID from '../../utils/getID.js';
import { allParties } from '../../utils';

class StartVote extends Component {
  constructor() {
    super();

    this.state = {
      party_id: ''
    }
  }

  endVoting = async(party_id) => {
    let data = await callAPI(
      'api/parties/save',
      'POST',
      false,
      { 'party_id': party_id,
        'voting': false
      },
    );

    if (data) {
      alert('Voting has ended!')
      this.props.history.push('/');
      window.location.reload();
    }
  }

  hosted = async(token) => {
    let user_id = getID(token);
    let host = await callAPI(
      'api/parties/retrieve',
      'GET',
      {'host_id': user_id},
      false
    );

    if (host.success) {
      return host.parties;
    }
  }

  timeDiff = (start, diff) => {
    let ms = (new Date()) - (new Date(start));
    let hours = Math.abs(ms / 3600000);
    if (hours < diff) {
      return true;
    } else {
      return false;
    }
  }

  startVoting = async(e) => {
    e.preventDefault();

    let data_json = {};

    data_json['party_id'] = this.state.party_id;
    data_json['voting'] = true;
    let total_minutes = 1;
    let voting_end = new Date();
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

  async componentDidMount() {
    if (this.props.token) {
      let parties = await this.hosted(this.props.token);
      let current = parties.filter(party => this.timeDiff(party.start,100));
      if (current.length == 1) {
        let party_id = current[0].party_id;

        this.setState({ party_id });
      }
    }
  }

  render() {
    console.log(this.state);
    if (!this.props.token) {
      return null;
    }

    return (
      <div>
      { this.state.party_id &&
        <button className="btn btn-danger" onClick={this.startVoting}>
          Start Voting
        </button>
      }
      </div>
    );
  }
}

export default withRouter(StartVote);
