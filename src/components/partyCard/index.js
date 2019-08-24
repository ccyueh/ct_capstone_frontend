import React, { Component } from 'react';
import './index.css';
import { withRouter, Link } from 'react-router-dom';

class PartyCard extends Component {
  deleteParty = async(party_id) => {
    if (!window.confirm('Are you sure you want to cancel this party?')) {
      return;
    }

    let URL = 'http://localhost:5000/api/parties/delete?party_id=';
    URL += party_id;

    let response = await fetch(URL, {
      'method': 'DELETE',
      'headers': { 'Content-Type': 'application/json' }
    })

    let data = await response.json();

    if (data.success) {
      alert(`${data.success}`);
      this.props.history.push('../');
    } else if (data.error) {
      alert(`${data.error}`);
    } else {
      alert('Sorry, try again.');
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

  render() {
    let p = this.props.party;
    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{p.party_name}</h4>
          <h5 className="card-subtitle text-muted">{p.location}</h5>
          <h6 className="card-text">{this.toDate(p.start)}</h6>
          <h6 className="card-text">{this.toTime(p.start)} - {this.toTime(p.end)}</h6>
          <Link to={{
            pathname: "../bottle/party",
            state: {
              token: this.props.token,
              party_id: this.props.party.party_id
            }
          }}>
            <button className="btn btn-danger">
              View{!this.props.host && <span>/Rate</span>} Bottles
            </button>
          </Link>
          { !this.props.host &&
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
          { this.props.host &&
            <Link to={{
              pathname: "../party/create",
              state: {
                token: this.props.token,
                party_id: this.props.party.party_id
              }
            }}>
              <button className="btn btn-danger">
                  Edit Party
              </button>
            </Link>
          }
          { this.props.host &&
            <button className="btn btn-danger" onClick={() => this.deleteParty(this.props.party.party_id)}>
                Cancel Party
            </button>
          }
        </div>
      </div>
    );
  }
}

export default withRouter(PartyCard);
