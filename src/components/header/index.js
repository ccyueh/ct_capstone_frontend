import React, { Component } from 'react';
import './index.css';
import { NavLink } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <NavLink className="navbar-brand" to="/">Sipper</NavLink>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              { !this.props.token &&
                <span>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">Register</NavLink>
                  </li>
                </span>
              }
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">About Sipper</NavLink>
              </li>
              { this.props.token &&
                <span>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/profile">Your Profile</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/party/create">Host a Party</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/party/join">Accept an Invite</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/party/view">Your Parties</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login" onClick={this.props.handleLogout}>Logout</NavLink>
                  </li>
                </span>
              }
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
