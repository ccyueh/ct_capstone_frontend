import React from 'react';
import './index.css';

function BottleTable(props) {
  let b = props.bottle;
  return (
    <div>
    <p>Producer: {b.producer}</p>
    <p>Name/Varietal: {b.bottle_name}</p>
    <p>Vintage: {b.vintage}</p>
    </div>
  );
}

export default BottleTable;
