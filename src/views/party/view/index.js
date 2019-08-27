import React, { Component } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import DisplayParty from '../display';

class ViewParty extends Component {
  constructor() {
    super();

    this.state = {
      past: false,
    }
  }

  selectTime = value => {
    this.setState({ 'past': value });
  }

  render() {
    return (
      <div className="container">
        <h1>Parties</h1>
          <div className="col-md-12 text-center">
            <div className="btn-group">
              <button className="btn btn-danger"
                onClick={() => this.selectTime(false)}>
                Upcoming
              </button>
              <button className="btn btn-danger"
                onClick={() => this.selectTime(true)}>
                Past
              </button>
            </div>
          </div>
          <div className="container">
            <DisplayParty token={this.props.token} past={this.state.past} parties={this.props.parties} />
          </div>
        </div>
    );
  }
}

export default ViewParty;
