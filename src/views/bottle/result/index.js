import React, { Component } from 'react';
import './index.css';
import { withRouter } from 'react-router-dom';
import Format from '../../../components/format';
import BottleButton from '../../../components/bottleButton';
import callAPI from '../../../utils/api.js';
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

  retrieveRating = async(bottle_id) => {
    let data = await callAPI(
      'api/ratings/retrieve',
      'GET',
      {'bottle_id': bottle_id},
      false
    );

    if (data) {
      if (data.star_ratings.length > 0) {
        let avg = data.star_ratings.reduce((a, b) => a + b)/data.star_ratings.length;
        return avg;
      }
    } else {
      return [];
    }
  }

  bottleData = async(bottles) => {
    let bottle_data = [];

    for (let i in bottles) {
      let bottle = bottles[i];
      let bottle_num = Number(i) + Number(1);
      let star_rating = await this.retrieveRating(bottle.bottle_id);
      bottle_data.push({
        bottle: bottle,
        bottle_num: bottle_num,
        star_rating: star_rating
      })
    }

    bottle_data.sort((a, b) => (a.star_rating < b.star_rating) ? 1 : -1);
    return bottle_data;
  }

  async componentDidMount() {
    let user_id = getID(this.props.token);
    let parties = await allParties(this.props.token);
    let last = lastParty(parties);
    let party = last.length > 0 ? last[0] : {};

    if (Object.keys(party).length > 0) {
      let party_id = party.party_id;
      let host_id = party.host_id;
      let guest = (user_id != host_id ? user_id : false);
      let reveal = party.reveal;
      let bottles = await getBottles(party_id);
      let bottle_data = await this.bottleData(bottles);

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
            />
          )}
          </div>
        }

      </Format>
    );
  }
}

export default withRouter(ResultBottle);
