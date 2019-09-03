import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

function PartyNone() {
  return (
    <div className="no-parties">
      <p className="text-secondary">No parties found.</p>
      <p><Link to='../party/create'>Host a Party</Link></p>
      <p><Link to='../party/join'>Attend a Party</Link></p>
    </div>
  );
}

export default PartyNone;
