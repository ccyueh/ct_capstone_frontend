import React from 'react';
import './index.css';

function CreatePartyForm(props) {
  return (
    <form onSubmit={props.createParty}>
      <div className="form-group">
        <label>Party Name</label>
        <input type="text" className="form-control" name="party_name" />
        <label>Location</label>
        <input type="text" className="form-control" name="location" />
        <label>Date</label>
        <input type="date" className="form-control" name="date" />
        <label>Start Time</label>
        <input type="time" className="form-control" name="start_time" />
        <label>End Time</label>
        <input type="time" className="form-control" name="end_time" />
      </div>
      <button type="submit" className="btn btn-primary">Create New Party</button>
    </form>
  );
}

export default CreatePartyForm;
