import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import getID from '../../utils/getID.js';

function PartyNone(props) {
  return (
    <div className="no-parties">
      <p className="text-secondary">No parties found.</p>
      { props.token &&
        ([22,39,43]).indexOf(getID(props.token)) != -1 &&
        <p><Link to='../party/create'>Host a Party</Link></p>
      }
      <p><Link to='../party/join'>Attend a Party</Link></p>
    </div>
  );
}

export default PartyNone;
