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

  async componentDidMount() {
    let params = this.props.history.location.state;
    if (params.party) {
      let user_id = getID(params.token);
      let party_id = params.party.party_id;
      let guest = (user_id != params.party.host_id ? user_id : false);
      let bottles = await this.retrieveBottle(party_id);

      this.setState({
        'guest': guest,
        'bottles': bottles,
      });
    }
  }

  render() {
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
