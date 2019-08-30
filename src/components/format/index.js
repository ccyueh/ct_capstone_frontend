import React, { Component } from 'react';
import './index.css';

function Format(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          {props.title &&
            <h2 className="mt-2 mb-4">{props.title}</h2>
          }
          {props.children}
        </div>
      </div>
    </div>
  );
}


export default Format;
