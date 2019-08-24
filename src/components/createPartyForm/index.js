import React, { Component } from 'react';
import './index.css';
import { withRouter } from 'react-router-dom';

class CreatePartyForm extends Component {
  constructor() {
    super();

    this.state = {
      party_id: '',
      party_name: '',
      location: '',
      date: '',
      start_time: '',
      end_time: ''
    }
  }

  retrieveParty = async(e) => {
    let URL = 'http://localhost:5000/api/parties/retrieve?party_id=';
    URL += this.props.history.location.state.party_id;

    let response = await fetch(URL, {
      'method': 'GET',
      'headers': { 'Content-Type': 'application/json' }
    })

    let data = await response.json();
    if (data.success) {
      let party = data.parties[0];

      let start = new Date(party.start);
      let end = new Date(party.end);
      let offset = start.getTimezoneOffset()/60;
      party.date = [start.getFullYear(), ("0" + (start.getMonth() + 1)).slice(-2), ("0" + start.getDate()).slice(-2)].join('-');
      party.start_time = ("0" + (start.getHours() + offset)).slice(-2) + ':' + ("0" + start.getMinutes()).slice(-2);
      party.end_time = ("0" + (end.getHours() + offset)).slice(-2) + ':' + ("0" + end.getMinutes()).slice(-2);

      return party;
    } else if (data.error) {
      alert(`${data.error}`);
    } else {
      alert('Sorry, try again.');
    }
  }

  async componentDidMount() {
    if (this.props.history.location.state.party_id) {
      let party = await this.retrieveParty();

      if (party.party_id) {
        this.setState({
          'party_id': party.party_id,
          'party_name': party.party_name,
          'location': party.location,
          'date': party.date,
          'start_time': party.start_time,
          'end_time': party.end_time
        });
      }
    }
  }

  render() {
    return (
      <form onSubmit={this.props.createParty}>
        <div className="form-group">
          <label>Party Name</label>
          <input type="text" className="form-control" name="party_name" defaultValue={this.state.party_name} />
          <label>Location</label>
          <input type="text" className="form-control" name="location" defaultValue={this.state.location} />
          <label>Date</label>
          <input type="date" className="form-control" name="date" defaultValue={this.state.date} />
          <label>Start Time</label>
          <input type="time" className="form-control" name="start_time" defaultValue={this.state.start_time} />
          <label>End Time</label>
          <input type="time" className="form-control" name="end_time" defaultValue={this.state.end_time} />
          {this.state.party_id &&
            <input readOnly type="text" name="party_id" value={this.state.party_id} className="d-none" />
          }
        </div>
        <button type="submit" className="btn btn-primary">
          {this.state.party_name ? "Create New Party" : "Update Party Details" }
        </button>
      </form>
    );
  }
}

export default withRouter(CreatePartyForm);
