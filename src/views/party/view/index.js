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

  handleHost = async(state) => {
    this.setState({ 'host': state });
  }

  render() {
    return (
      <div className="container">
        <h1>Parties</h1>
          <div className="col-md-12 text-center">
            <div className="btn-group">
              <button className="btn btn-danger"
                onClick={() => this.handleHost(false)}>
                As Guest
              </button>
              <button className="btn btn-danger"
                onClick={() => this.handleHost(true)}>
                As Host
              </button>
            </div>
          </div>
          { this.state.host &&
            <div className="container">
            <DisplayParty token={this.props.token} host={true} />
            </div>
          }
          { !this.state.host &&
            <div className="container">
            <DisplayParty token={this.props.token} host={false} />
            </div>
          }

      </div>
    );
  }
}

export default ViewParty;
