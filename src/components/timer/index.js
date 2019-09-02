import React, { Component } from 'react';
import './index.css';
import { withRouter } from 'react-router-dom';
import Countdown from 'react-countdown-now';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import callAPI from '../../utils/api.js';
import getID from '../../utils/getID.js';

class Timer extends Component {
  constructor() {
    super();

    this.state = {
      party_id: '',
      voting_end: 0
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
      this.props.history.push('../');
    }
  }

  renderer = ({ hours, minutes, seconds, milliseconds, completed }) => {
    if (completed) {
      return null;
    } else {
      let hh = ("0" + hours).slice(-2);
      let mm = ("0" + minutes).slice(-2);
      let ss = ("0" + seconds).slice(-2);
      let ms = milliseconds/100;
      return (
        <div id="timer">
          <span>
            <AccessAlarmIcon className="d-none" />
            {hh}:{mm}:{ss}.{ms}
          </span>
        </div>
      )
    }
  }

  async componentDidMount() {
    let user_id = getID(this.props.token);
    let host = await callAPI(
      'api/parties/retrieve',
      'GET',
      {'host_id': user_id},
      false
    );

    let guest = await callAPI(
      'api/parties/retrieve',
      'GET',
      {'user_id': user_id},
      false
    );

    let parties = host.parties.concat(guest.parties);
    let current = parties.filter(party => party.voting == true);
    if (current.length == 1) {
      let party_id = current[0].party_id;
      let voting_end = current[0].voting_end;

      this.setState({ party_id, voting_end });
    }
  }

  render() {
    return (
      <Countdown
      date={this.state.voting_end}
      renderer={this.renderer}
      intervalDelay={0}
      precision={1}
      onComplete={() => this.endVoting(this.state.party_id)}
      />
    );
  }
}

export default withRouter(Timer);
