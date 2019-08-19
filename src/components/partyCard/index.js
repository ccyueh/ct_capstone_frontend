import React from 'react';
import './index.css';

function PartyCard(props) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{props.party.party_name}</h5>
        <h6 className="card-subtitle text-muted">{props.party.location}</h6>
        <p className="card-text">{props.party.start} - {props.party.end}</p>
        <a href="#" className="card-link">View{!props.host && <span>/Rate</span>} Bottles</a>
        { !props.host &&
          <a href="#" className="card-link">Your Bottle</a>
        }
      </div>
    </div>
  );
}

export default PartyCard;
