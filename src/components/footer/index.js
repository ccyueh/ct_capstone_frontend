import React, { Component } from 'react';
import './index.css';
import { NavLink } from 'react-router-dom';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';

class Footer extends Component {
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
          <NavLink className="footer-link" to="/">
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
          <NavLink className="footer-link" to="/">
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
