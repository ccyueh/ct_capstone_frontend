import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import PartyCard from '../../../components/partyCard';

function DisplayParty(props) {
  const filterParty = (parties, past) => {
    let now = new Date();
    if (past) {
      parties = parties.filter(party => (new Date(party.end) - now < 0) || party.reveal);
    } else {
      parties = parties.filter(party => (new Date(party.start) - now > 0) && !party.reveal);
    }
    return parties;
  }

  const sortParty = parties => {
    parties.sort(function(a,b) {
      return new Date(b.start) - new Date(a.start);
    })
    return parties;
  }

  let parties = props.parties;
  parties = sortParty(filterParty(parties, props.past));

  return (
    <div className="container">
      {parties.length == 0 &&
        <div id="no-parties">
          <p className="text-secondary">No parties found.</p>
          <p><Link to='../party/create'>Host a Party</Link></p>
          <p><Link to='../party/join'>Attend a Party</Link></p>
        </div>
      }
      {parties.length > 0 &&
        parties.map((party, index) => <PartyCard key={index} party={party} past={props.past} token={props.token} />)
      }
    </div>
  );
}

export default DisplayParty;
