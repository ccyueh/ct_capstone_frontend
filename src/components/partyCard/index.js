import React, { Component } from 'react';
import './index.css';
import { withRouter, Link } from 'react-router-dom';

class PartyCard extends Component {
  constructor() {
    super();

    this.state = {
      guest: '',
    }
  }

  toDate = datetime => {
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return new Date(datetime).toLocaleDateString('en-US', options);
  }

  toTime = datetime => {
    let time = new Date(datetime);
    let offset = time.getTimezoneOffset()/60;
    time.setHours(time.getHours() + offset);
    return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true});
  }

  componentDidMount() {
    let token = this.props.token;
    let user_id = JSON.parse(atob(token.split('.')[1])).user_id;
    let guest = (user_id != this.props.party.host_id ? user_id : false);

    this.setState({ guest });
  }

  render() {
    let p = this.props.party;
    return (
      <div className={"card" + (!this.state.guest ? " host-card" : "")}>
        <div className="card-body">
          <h3 className="card-title">{p.party_name}</h3>
          <h5 className="card-subtitle text-muted">{p.location}</h5>
          <h6 className="card-text">{this.toDate(p.start)}</h6>
          <h6 className="card-text">{this.toTime(p.start)} - {this.toTime(p.end)}</h6>

          { this.props.past &&
            <Link to={{
              pathname: "../bottle/party",
              state: {
                token: this.props.token,
                party_id: this.props.party.party_id
              }
            }}>
              <button className="btn btn-danger">
                View Results
              </button>
            </Link>
          }

          { this.state.guest &&
            <Link to={{
              pathname: "../bottle/add",
              state: {
                token: this.props.token,
                party_id: this.props.party.party_id
              }
            }}>
              <button className="btn btn-danger">
                  Add/Edit Bottle
              </button>
            </Link>
          }
          { !this.state.guest && !this.props.past &&
            <Link to={{
              pathname: "../party/options",
              state: {
                token: this.props.token,
                party: this.props.party
              }
            }}>
              <button className="btn btn-danger">
                  Options
              </button>
            </Link>
          }
        </div>
      </div>
    );
  }
}

export default withRouter(PartyCard);
