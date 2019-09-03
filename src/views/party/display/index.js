import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import PartyCard from '../../../components/partyCard';
import PartyNone from '../../../components/partyNone';

function DisplayParty(props) {
  const filterParty = (parties, past) => {
    let now = new Date();
    if (past) {
      parties = parties.filter(party => (new Date(party.end) - now < 0) || party.reveal);
    } else {
      parties = parties.filter(party => (new Date(party.start) - now > 0) || !party.reveal);
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
        <PartyNone />
      }
      {parties.length > 0 &&
        parties.map((party, index) => <PartyCard key={index} party={party} past={props.past} token={props.token} />)
      }
    </div>
  );
}

export default DisplayParty;
