import React, { Component } from 'react';
import './index.css';
import { withRouter } from 'react-router-dom';
import Format from '../../../components/format';
import BottleButton from '../../../components/bottleButton';
import callAPI from '../../../utils/api.js';
import getID from '../../../utils/getID.js';

class VoteBottle extends Component {
  constructor(props) {
    super();

    this.state = {
      voting: false,
      guest: '',
      bottles: [],
    }
  }

  retrieveBottle = async(party_id) => {
    let data = await callAPI(
      'api/bottles/retrieve',
      'GET',
      {'party_id': party_id},
      false
    );

    if (data) {
      return data.bottles;
    } else {
      return [];
    }
  }

  bottleNum = bottle => {
    let bottles = this.state.bottles;
    let num = bottles.indexOf(bottle) + 1;
    return num;
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
    let party = current.length > 0 ? current[0] : false;

    if (party) {
      if (Object.keys(party).length > 0) {
        let party_id = party.party_id;
        let host_id = party.host_id;
        let guest = (user_id != host_id ? user_id : false);
        let voting = party.voting;
        let bottles = await this.retrieveBottle(party_id);

        this.setState({ voting, guest, bottles });
      }
    }
  }

  render() {
    if (!this.props.token) {
      this.props.history.push('/');
    }
    
    if (!this.state.voting) {
      return (
        <Format title="">
          <p className="mt-5">
            Voting is not active for any of your parties. Check back when the countdown clock appears!
          </p>
        </Format>
      );
    }

    if (this.state.bottles.length == 0 ) {
      return (
        <Format title="">
          <p className="mt-5">
            No bottles found for this party.
          </p>
        </Format>
      );
    }

    return (
      <Format title="">
        <div className="row">
          {this.state.bottles.map(bottle =>
            <BottleButton
              key={bottle.bottle_id}
              bottle={bottle}
              num={this.bottleNum(bottle)}
              guest={this.state.guest}
              voting={true}
              />
          )}
        </div>
      </Format>
    );
  }
}

export default withRouter(VoteBottle);
