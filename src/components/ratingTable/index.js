import React from 'react';
import './index.css';

function RatingTable(props) {
  let r = props.rating;
  return (
    <div>
    <p>Rating: {r.stars}</p>
    <p>Characteristics: {r.characteristics.join(', ')}</p>
    <p>Tasting Notes: {r.description}</p>
    </div>
  );
}

export default RatingTable;
