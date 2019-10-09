import React, { Component } from 'react';
import './index.css';
import { NavLink } from 'react-router-dom';
import HeaderIcon from '../../header.png';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <NavLink className="navbar-brand" to="/">
            <img id="header-icon" src={HeaderIcon} alt="header" />
          </NavLink>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              { !this.props.token &&
                <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                  <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
              }
              { !this.props.token &&
                <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                  <NavLink className="nav-link" to="/register">Register</NavLink>
                </li>
              }
              <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                <NavLink className="nav-link" to="/about">About</NavLink>
              </li>
              { this.props.token &&
                <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                  <NavLink className="nav-link" to="/profile">Your Profile</NavLink>
                </li>
              }
              { this.props.token &&
                <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                  <NavLink className="nav-link" to="/party/create">Host a Party</NavLink>
                </li>
              }
              { this.props.token &&
                <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                  <NavLink className="nav-link" to="/party/join">Accept an Invite</NavLink>
                </li>
              }
              { this.props.token &&
                <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                  <NavLink className="nav-link" to="/party/view">Your Parties</NavLink>
                </li>
              }
              { this.props.token &&
                <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                  <NavLink className="nav-link" to="/login" onClick={this.props.handleLogout}>Logout</NavLink>
                </li>
              }
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
