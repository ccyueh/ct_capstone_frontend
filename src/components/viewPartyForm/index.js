import React from 'react';
import './index.css';

function ViewPartyForm(props) {
  return (
    <form onSubmit={props.viewParty}>
      <div className="form-group">
        <label>Party ID</label>
        <input type="number" className="form-control" name="party_id" />
        <label>User ID</label>
        <input type="number" className="form-control" name="user_id" />
        <label>Host ID</label>
        <input type="number" className="form-control" name="host_id" />
      </div>
      <button type="submit" className="btn btn-primary">View Party Details</button>
    </form>
  );
}

export default ViewPartyForm;
