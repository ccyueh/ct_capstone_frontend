import React, { Component } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import Format from '../../components/format';
import PartyCard from '../../components/partyCard';
import PartyNone from '../../components/partyNone';
import { allParties } from '../../utils';

import LocalBarTwoToneIcon from '@material-ui/icons/LocalBarTwoTone';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import LocalBarOutlinedIcon from '@material-ui/icons/LocalBarOutlined';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      party: {},
      past: ''
    }
  }

  async componentDidMount() {
    if (this.props.token) {
      let parties = await allParties(this.props.token);
      if (parties.length > 0) {
        let current = parties.filter(party => party.voting == true);
        let party = current.length > 0 ? current[0] : false;
        let past = true;

        if (!party) {
          let last = parties.filter(party =>
            (new Date() > (new Date(party.voting_end))) && (new Date() - (new Date(party.voting_end)) < 3600000));
            party = last.length > 0 ? last[0] : false;
          }

          if (!party) {
            parties = parties.filter(party =>
              //(new Date(party.voting_end) - (new Date()) > 0) &&
              //(new Date(party.start) - (new Date()) > 0) &&
              !party.reveal);
              parties.sort(function(a,b) {
                return new Date(a.start) - new Date(b.start);
              })

              party = parties.length > 0 ? parties[0] : false;
              past = false;
            }

            if (party) {
              this.setState({ party, past });
            }
          }
    }
  }

  render() {
    if (!this.props.token) {
      return (
        <Format title="Sipper">
          <p className="no-parties text-justify">Welcome to Sipper, the app that lets you plan competitive wine tasting parties with your friends! <Link to="/register">Register</Link> for an account or <Link to="/login">sign in</Link> to get started.</p>
          <p className="home-icons">
            <LocalBarOutlinedIcon />
            <LocalBarTwoToneIcon />
            <LocalBarIcon />
          </p>
        </Format>
      );
    }

    return (
      <Format title={(this.state.past ? "Current" : "Next") + " Party"}>
        {Object.keys(this.state.party).length == 0 &&
          <PartyNone />
        }
        {Object.keys(this.state.party).length > 0 &&
          <PartyCard party={this.state.party} past={this.state.past} token={this.props.token} />
        }
      </Format>
    );
  }
}

export default Home;
