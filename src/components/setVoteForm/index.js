import React from 'react';
import './index.css';

function SetVoteForm(props) {
  return (
    <form onSubmit={props.startVoting}>
      <div className="voting-end">
        <label>Hours</label>
        <input type="number" className="form-control" name="hours" />
        <label>Minutes</label>
        <input type="number" className="form-control" name="minutes" />
        <input readOnly type="number" name="party_id" value={props.party_id} className="d-none" />
        <button type="submit" className="btn btn-danger">
          Set Voting Period
        </button>
      </div>
    </form>
  );
}

export default SetVoteForm;
