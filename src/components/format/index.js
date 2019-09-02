import React, { Component } from 'react';
import './index.css';

function Format(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 col-md-9 col-sm-12">
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
