import React from 'react';
import './index.css';
import PartyCard from '../../../components/partyCard';
import PartyNone from '../../../components/partyNone';

function DisplayParty(props) {
  const filterParty = (parties, past) => {
    if (past) {
      parties = parties.filter(party => party.reveal)
    } else {
      parties = parties.filter(party => !party.reveal)
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
        <PartyNone token={props.token} />
      }
      {parties.length > 0 &&
        parties.map((party, index) => <PartyCard key={index} party={party} past={props.past} token={props.token} />)
      }
    </div>
  );
}

export default DisplayParty;
