import React, { Component } from 'react';
import './index.css';
import { Link, withRouter } from 'react-router-dom';
import DisplayParty from '../display';
import callAPI from '../../../utils/api.js';
import getID from '../../../utils/getID.js';

class ViewParty extends Component {
  constructor() {
    super();

    this.state = {
      parties: [],
      past: false
    }
  }

  selectTime = value => {
    this.setState({ 'past': value });
  }

  async componentDidMount() {
    let host = await callAPI(
      'api/parties/retrieve',
      'GET',
      {'host_id': getID(this.props.token)},
      false
    );

    let guest = await callAPI(
      'api/parties/retrieve',
      'GET',
      {'user_id': getID(this.props.token)},
      false
    );
    
    let parties = host.parties.concat(guest.parties);
    this.setState({ parties });
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
            <DisplayParty token={this.props.token} past={this.state.past} parties={this.state.parties} />
          </div>
        </div>
    );
  }
}

export default withRouter(ViewParty);
