import React, { Component } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import DisplayParty from '../display';

class ViewParty extends Component {
  constructor() {
    super();

    this.state = {
      past: false,
      host: false
    }
  }

  handleClick = (host, past) => {
    if (host || !host) {
      this.setState({ 'host': host });
      console.log(this.state.host);
    }
    if (past || !past) {
      this.setState({ 'past': past });
      console.log(this.state.past);
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Parties</h1>
          <div className="btn-group">
            <button className="btn btn-primary" onClick={() => this.handleClick('', false)} >
              Upcoming
            </button>
            <button className="btn btn-primary" onClick={() => this.handleClick('', true)} >
              Previous
            </button>
          <div className="btn-group">

          <button className="btn btn-secondary dropdown-toggle" data-toggle="dropdown">
              As Guest
            </button>
            <div className="dropdown-menu">
            <button className="btn dropdown-item" onClick={() => this.handleClick(false, '')}>
              As Guest
            </button>
            <button className="btn dropdown-item" onClick={() => this.handleClick(true, '')}>
              As Host
            </button>
            </div>
          </div>

          </div>
            {/* this.state.past &&
              <div className="container">
              <DisplayParty token={this.props.token} past={true} host={true} />
              <DisplayParty token={this.props.token} past={true} host={false} />
              </div>
            }
            { !this.state.past &&
              <div className="container">
              <DisplayParty token={this.props.token} past={false} host={true} />
              <DisplayParty token={this.props.token} past={false} host={false} />
              </div>
            */}
            <DisplayParty token={this.props.token} past={this.state.past} host={this.state.host} />
      </div>
    );
  }
}

export default ViewParty;
