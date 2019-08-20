import React, { Component } from 'react';
import './index.css';
import { Link } from 'react-router-dom';

class PartyCard extends Component {
  toDate = datetime => {
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return new Date(datetime).toLocaleDateString('en-US', options);
  }

  toTime = datetime => {
    return new Date(datetime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true});
  }

  setParty = party_id => {
    localStorage.setItem('party_id', party_id);
  }

  render() {
    let p = this.props.party;
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{p.party_name}</h5>
          <h6 className="card-subtitle text-muted">{p.location}</h6>
          <p className="card-text">{this.toDate(p.start)} {this.toTime(p.start)} - {this.toTime(p.end)}</p>
          <Link to="../bottle/party" className="card-link">
            <button className="btn btn-primary"
              onClick={() => this.setParty(p.party_id)}>
              View{!this.props.host && <span>/Rate</span>} Bottles
            </button>
          </Link>
          { !this.props.host &&
            <Link to="../bottle/add" className="card-link">
              <button className="btn btn-primary"
                onClick={() => this.setParty(p.party_id)}>
                  Add/Edit Bottle
              </button>
            </Link>
          }
        </div>
      </div>
    );
  }
}

export default PartyCard;
