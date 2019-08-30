import React, { Component } from 'react';
import './index.css';
import { withRouter } from 'react-router-dom';
import BottleButton from '../../../components/bottleButton';
import callAPI from '../../../utils/api.js';
import getID from '../../../utils/getID.js';

class VoteBottle extends Component {
  constructor(props) {
    super();

    this.state = {
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

  timeDiff = (voting_end, diff) => {
    let ms = (new Date()).getTime() - (new Date(voting_end)).getTime();
    let hours = ms / 3600000;
    if (hours < diff) {
      return true;
    } else {
      return false;
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
    let last = parties.filter(party => party.reveal == true && this.timeDiff(party.voting_end, 24));

    if (current.length == 1) {
      let party_id = current[0].party_id;
      let host_id = current[0].host_id;

      let guest = (user_id != host_id ? user_id : false);
      let bottles = await this.retrieveBottle(party_id);

      this.setState({ guest, bottles });
    } else if (last.length == 1) {
      let party_id = last[0].party_id;
      let host_id = last[0].host_id;

      let guest = (user_id != host_id ? user_id : false);
      let bottles = await this.retrieveBottle(party_id);

      this.setState({ guest, bottles });
    }
  }

  render() {
    if (this.state.bottles.length == 0 ) return <p>No bottles</p>
    return (
      <div className="row">
        {this.state.bottles.map(bottle =>
          <BottleButton
            key={bottle.bottle_id}
            bottle={bottle}
            num={this.bottleNum(bottle)}
            guest={this.state.guest}
            />
        )}
      </div>
    );
  }
}

export default withRouter(VoteBottle);
