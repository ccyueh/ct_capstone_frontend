import React, { Component } from 'react';
import './index.css';
import { withRouter } from 'react-router-dom';
import Format from '../../../components/format';
import BottleButton from '../../../components/bottleButton';
import getID from '../../../utils/getID.js';
import { allParties, lastParty, getBottles } from '../../../utils';

class ResultBottle extends Component {
  constructor(props) {
    super();

    this.state = {
      reveal: '',
      user_id: '',
      guest: '',
      bottles: [],
    }
  }

  async componentDidMount() {
    let user_id = getID(this.props.token);
    let party = {};
    if (this.props.history.location.state) {
      party = this.props.history.location.state.party;
    } else {
      let parties = await allParties(this.props.token);
      let last = lastParty(parties);
      party = last.length > 0 ? last[0] : {};
    }

    if (Object.keys(party).length > 0) {
      let party_id = party.party_id;
      let host_id = party.host_id;
      let guest = (user_id != host_id ? user_id : false);
      let reveal = party.reveal;
      let bottles = await getBottles(party_id);

      let bottle_data = [];
      bottles.map((bottle, index) => bottle_data.push({
        'bottle': bottle,
        'bottle_num': Number(index) + Number(1),
        'star_rating': bottle.star_rating
      }));
      bottle_data.sort((a, b) => (a.star_rating < b.star_rating) ? 1 : -1);

      this.setState({ reveal, user_id, guest, bottles: bottle_data });
    } else {
      this.setState({ user_id });
    }
  }

  render() {
    return (
      <Format token={this.props.token} title="">

        { !this.state.reveal &&
          this.state.guest &&
          <p className="mt-5">
            Results have not yet been released for this party. Try again soon!
          </p>
        }

        { !this.state.reveal &&
          this.state.bottles.length > 0 &&
          !this.state.guest &&
          <button className="btn btn-danger" onClick={() => this.setState({ 'reveal': true })}>
            Preview Results
          </button>
        }

        { this.state.reveal &&
          this.state.bottles.length == 0 &&
          <p className="mt-5">
            No bottles found for this party.
          </p>
        }

        { this.state.reveal.length == 0 &&
          this.state.user_id &&
          <p className="mt-5">
            No recent or ongoing parties found.
          </p>
        }

        { this.state.reveal &&
          <div className="row">
          {this.state.bottles.map((bottle, index) =>
            <BottleButton
            key={bottle.bottle.bottle_id}
            bottle={bottle.bottle}
            num={bottle.bottle_num}
            user_id={this.state.user_id}
            voting={false}
            button_size={index}
            reveal={true}
            />
          )}
          </div>
        }

      </Format>
    );
  }
}

export default withRouter(ResultBottle);
