import React, { Component } from 'react';
import './index.css';

function Form(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          {props.title &&
            <h2>{props.title}</h2>
          }
          {props.children}
        </div>
      </div>
    </div>
  );
}


export default Form;
