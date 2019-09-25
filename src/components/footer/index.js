import React, { Component } from 'react';
import './index.css';
import { NavLink } from 'react-router-dom';
import { allParties } from '../../utils';

import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

class Footer extends Component {
  constructor() {
    super();

    this.state = {
      current: {},
      last: {}
    }
  }

  timeDiff = (voting_end, diff) => {
    let ms = (new Date()) - (new Date(voting_end));
    let hours = Math.abs(ms / 3600000);
    if (hours < diff) {
      return true;
    } else {
      return false;
    }
  }

  async componentDidMount() {
    if (this.props.token) {
      let parties = await allParties(this.props.token);
      let current = parties.filter(party => party.voting == true);
      let last = parties.filter(party => party.reveal == true && this.timeDiff(party.voting_end, 6));

      current = current.length > 0 ? current[0] : {};
      last = last.length > 0 ? last[0] : {};

      this.setState({ current, last });
    }
  }

  render() {
    return (
      <div className="footer col-lg-4 offset-lg-4 col-md-8 offset-md-2 col-sm-12">
        <nav className="navbar row">
          <div className="col footer-icon">
            <NavLink className="footer-link" to="/">
            <div>
              <HomeOutlinedIcon />
            </div>
            Home
            </NavLink>
          </div>
          <div className="col footer-icon">
            <NavLink
              className="footer-link"
              to={{
                pathname: "../bottle/party",
                state: { party: this.state.current }
              }}>
            <div>
              <StarBorderOutlinedIcon />
            </div>
            Vote
            </NavLink>
          </div>
          <div className="col footer-icon">
            <NavLink
              className="footer-link"
              to={{
                pathname: "../bottle/result",
                state: { party: this.state.last }
              }}>
            <div>
              <FormatListNumberedIcon />
            </div>
            Results
            </NavLink>
          </div>
          <div className="col footer-icon">
            <NavLink className="footer-link" to="../party/reset">
              <div>
                <SettingsOutlinedIcon />
              </div>
              Settings
            </NavLink>
          </div>
        </nav>
      </div>
    );
  }
}

export default Footer;
