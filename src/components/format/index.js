import React, { Component } from 'react';
import './index.css';
import { withRouter } from 'react-router-dom';

function Format(props) {
  if (!props.token) {
    props.history.push('/');
    window.location.reload();
  }
  
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


export default withRouter(Format);
