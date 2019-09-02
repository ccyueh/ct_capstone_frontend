import React from 'react';
import './index.css';

function SetVoteForm(props) {
  return (
    <form onSubmit={props.startVoting}>
      <div id="voting-end">
        <label>Hours</label>
        <select className="form-control" name="hours">
          {[...Array(24).keys()].map((hour, index) =>
            <option key={index}>{hour}</option>)}
        </select>
        <label>Minutes</label>
        <select className="form-control" name="minutes">
          {[...Array(60).keys()].map((minute, index) =>
            <option key={index}>{minute}</option>)}
        </select>
        <input readOnly type="number" name="party_id" value={props.party_id} className="d-none" />
        <button type="submit" className="btn btn-danger mt-3">
          Set Voting Period
        </button>
      </div>
    </form>
  );
}

export default SetVoteForm;
