import React, { Component } from 'react';
import './index.css';
import { NavLink } from 'react-router-dom';
import { allParties, currentParty, lastParty } from '../../utils';

import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';

class Footer extends Component {
  constructor() {
    super();

    this.state = {
      current: {},
      last: {}
    }
  }

  async componentDidMount() {
    if (this.props.token) {
      let parties = await allParties(this.props.token);
      let current = currentParty(parties);
      let last = lastParty(parties);

      current = current.length > 0 ? current[0] : {};
      last = last.length > 0 ? last[0] : {};

      this.setState({ current, last });
    }
  }

  render() {
    return (
      <div className="footer">
        <div className="col-lg-4 offset-lg-4 col-md-8 offset-md-2 col-sm-12">
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
              <NavLink className="footer-link" to="../bottle/party">
              <div>
                <StarBorderOutlinedIcon />
              </div>
              Vote
              </NavLink>
            </div>
            <div className="col footer-icon">
              <NavLink className="footer-link" to="../bottle/result">
              <div>
                <FormatListNumberedIcon />
              </div>
              Results
              </NavLink>
            </div>
            <div className="col footer-icon">
              <NavLink className="footer-link" to="../directions">
                <div>
                  <HelpOutlineOutlinedIcon />
                </div>
                How to Sip
              </NavLink>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default Footer;
