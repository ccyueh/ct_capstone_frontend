import React, { Component } from 'react';
import './index.css';
import { withRouter } from 'react-router-dom';

class CreatePartyForm extends Component {
  constructor(props) {
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

  formatDate = (party_start, party_end) => {
    let start = new Date(party_start);
    let end = new Date(party_end);
    let offset = start.getTimezoneOffset()/60;

    let time = {};
    time['date'] = [start.getFullYear(), ("0" + (start.getMonth() + 1)).slice(-2), ("0" + start.getDate()).slice(-2)].join('-');
    time['start_time'] = ("0" + (start.getHours() + offset)).slice(-2) + ':' + ("0" + start.getMinutes()).slice(-2);
    time['end_time'] = ("0" + (end.getHours() + offset)).slice(-2) + ':' + ("0" + end.getMinutes()).slice(-2);

    return time;
  }

  componentDidUpdate(prevProps) {
    if (this.props.party !== prevProps.party) {
      let party = this.props.party;
      if (party.party_id) {
        let time = this.formatDate(party.start, party.end);

        this.setState({
          'party_id': party.party_id,
          'party_name': party.party_name,
          'location': party.location,
          'date': time.date,
          'start_time': time.start_time,
          'end_time': time.end_time
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
          { this.state.party_id &&
            <input readOnly type="text" name="party_id" value={this.state.party_id} className="d-none" />
          }
        </div>
        <button type="submit" className="btn btn-danger">
          {this.state.party_id.length == 0 ? "Create New Party" : "Update Party Details" }
        </button>
      </form>
    );
  }
}

export default withRouter(CreatePartyForm);
