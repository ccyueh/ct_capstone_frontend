import React, { Component } from 'react';
import './index.css';
import Countdown from 'react-countdown-now';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';

class Timer extends Component {
  endVoting = async(party) => {
    const URL = 'http://localhost:5000/api/parties/save';

    let response = await fetch(URL, {
      'method': 'POST',
      'headers': { 'Content-Type': 'application/json' },
      'body': JSON.stringify({
        'party_id': party.party_id,
        'voting': false
      })
    })

    let data = await response.json();

    if (data.success) {
      alert('Voting has ended!');
      this.props.history.push({
        pathname: '../',
        state: {
          token: this.props.token
        }
      });
    } else if (data.error) {
      alert(`${data.error}`);
    } else {
      alert('Sorry, try again.');
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

  render() {
    return (
      <Countdown
      date={this.props.voting_end}
      renderer={this.renderer}
      intervalDelay={0}
      precision={1}
      onComplete={() => this.endVoting(this.props.party)}
      />
    );
  }
}

export default Timer;
