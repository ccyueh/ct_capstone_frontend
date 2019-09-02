import React, { Component } from 'react';
import './index.css';
import { NavLink } from 'react-router-dom';
import callAPI from '../../utils/api.js';
import getID from '../../utils/getID.js';

import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';

class Footer extends Component {
  constructor() {
    super();

    this.state = {
      current: {},
      last: {}
    }
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

    current = current.length > 0 ? current[0] : {};
    last = last.length > 0 ? last[0] : {};

    this.setState({ current, last });
  }

  render() {
    return (
      <div className="footer">
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
          <NavLink className="footer-link" to="/">
          <div>
            <PhotoCameraOutlinedIcon />
          </div>
          Photos
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
        </nav>
      </div>
    );
  }
}

export default Footer;
