import React, { Component } from 'react';
import './index.css';

function Form(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {props.title &&
            <h1>{props.title}</h1>
          }
          {props.children}
        </div>
      </div>
    </div>
  );
}


export default Form;
