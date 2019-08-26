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
          <div>
            <HomeOutlinedIcon />
          </div>
          Home
        </div>
        <div className="col footer-icon">
          <div>
            <StarBorderOutlinedIcon />
          </div>
          Vote
        </div>
        <div className="col footer-icon">
          <div>
            <PhotoCameraOutlinedIcon />
          </div>
          Photos
        </div>
        <div className="col footer-icon">
          <div>
            <FormatListNumberedIcon />
          </div>
          Results
        </div>
        </nav>
      </div>
    );
  }
}

export default Footer;
