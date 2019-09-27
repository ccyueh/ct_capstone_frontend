import React, { Component } from 'react';
import './index.css';
import { withRouter, Link } from 'react-router-dom';
import callAPI from '../../utils/api.js';
import getID from '../../utils/getID.js';
import HomeIcon from '@material-ui/icons/Home';

class PartyCard extends Component {
  constructor() {
    super();

    this.state = {
      bottle: {}
    }
  }

  retrieveBottle = async(user_id, party_id) => {
    let data = await callAPI(
      'api/bottles/retrieve',
      'GET',
      {'user_id': user_id, 'party_id': party_id},
      false
    );

    if (data) {
      if (data.bottles.length > 0 ){
        return data.bottles[0];
      } else {
        return {};
      }
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

  toDate = datetime => {
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return new Date(datetime).toLocaleDateString('en-US', options);
  }

  toTime = datetime => {
    let time = new Date(datetime);
    let offset = time.getTimezoneOffset()/60;
    time.setHours(time.getHours() + offset);
    return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true});
  }

  async componentDidMount() {
    let bottle = await this.retrieveBottle(getID(this.props.token), this.props.party.party_id);
    this.setState({ bottle });
  }

  render() {
    let party = this.props.party;
    let user_id = getID(this.props.token);
    let guest = (user_id != this.props.party.host_id ? user_id : false);

    return (
      <div className="card">
        <div className="is-host">
        { !guest &&
          <HomeIcon />
        }
        </div>
        <div className="card-body">
          <h3 className="card-title">{party.party_name}</h3>
          <h5 className="card-subtitle">{party.location}</h5>
          <h6 className="card-text">{this.toDate(party.start)}</h6>
          <h6 className="card-text">{this.toTime(party.start)} - {this.toTime(party.end)}</h6>

          { this.props.past &&
            party.reveal &&
            <Link to={{
              pathname: "../bottle/result",
              state: { party: party }
            }}>
              <button className="btn btn-danger">
                View Results
              </button>
            </Link>
          }
          { guest &&
            !this.props.past &&
            <Link to={{
              pathname: "../bottle/add",
              state: { party_id: party.party_id }
            }}>
              <button className="btn btn-danger">
                { Object.keys(this.state.bottle).length > 0 ? "Edit" : "Add" } Bottle
              </button>
            </Link>
          }
          { !guest &&
            !this.props.past &&
            <Link to={{
              pathname: "../party/options",
              state: { party: party }
            }}>
              <button className="btn btn-danger">
                  Options
              </button>
            </Link>
          }
          { !guest &&
            !party.reveal &&
            new Date() > (new Date(party.voting_end)) &&
            (new Date() - (new Date(party.voting_end))) < 3600000 &&
            <button
              className="btn btn-danger"
              onClick={() => this.setReveal(party, party.party_id)}
            >
              Reveal Bottles
            </button>
          }
        </div>
      </div>
    );
  }
}

export default withRouter(PartyCard);
