import React from 'react';
import './index.css';

function JoinPartyForm(props) {
  return (
    <form onSubmit={props.joinParty}>
      <div className="form-group">
        <label>Party Code</label>
        <input type="number" className="form-control" name="party_code" />
      </div>
      <button type="submit" className="btn btn-danger">Join Party</button>
    </form>
  );
}

export default JoinPartyForm;
