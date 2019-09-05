import React, { Component } from 'react';
import './index.css';
import { withRouter } from 'react-router-dom';
import { allParties } from '../../utils';

class CheckVote extends Component {
  getParty = async(e) => {
    if (this.props.token) {
      let parties = await allParties(this.props.token);
      let current = parties.filter(party => party.voting == true);
      if (current.length == 1) {
        this.props.history.push('/');
        window.location.reload();
      }
    }
  }

  async componentDidMount() {
    this.timerID = setInterval(() => this.getParty(), 1000);
  }

  render() {
    return null;
  }
}

export default withRouter(CheckVote);
