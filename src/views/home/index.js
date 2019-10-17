import React, { Component } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import Format from '../../components/format';
import PartyCard from '../../components/partyCard';
import PartyNone from '../../components/partyNone';
import { allParties, currentParty, lastParty } from '../../utils';
import Logo from '../../logo.jpg';

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
        let current = currentParty(parties);
        let party = current.length > 0 ? current[0] : false;
        let past = true;

        if (!party) {
          let last = lastParty(parties);
          party = last.length > 0 ? last[0] : false;
        }

        if (!party) {
          parties = parties.filter(party => !party.reveal);
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
        <Format token="token" title="">
          <div className="mw-table">
            <div className="img-container mb-0">
              <img src={Logo} alt="logo" />
            </div>
            <p className="no-parties text-justify">Welcome to SipperParty, the app that lets you plan competitive wine tasting parties with your friends! <Link to="/register">Register</Link> for an account or <Link to="/login">sign in</Link> to get started.</p>
          </div>
        </Format>
      );
    }

    return (
      <Format token={this.props.token} title={(this.state.past ? "Current" : "Next") + " Party"}>
        {Object.keys(this.state.party).length == 0 &&
          <PartyNone token={this.props.token} />
        }
        {Object.keys(this.state.party).length > 0 &&
          <PartyCard party={this.state.party} past={this.state.past} token={this.props.token} />
        }
      </Format>
    );
  }
}

export default Home;
