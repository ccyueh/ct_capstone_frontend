import React from 'react';
import './index.css';

function RegisterForm(props) {
  return (
    <form onSubmit={props.handleRegister}>
      <div className="form-group">
        <label>First Name</label>
        <input className="form-control" type="text" name="first" />
        <label>Last Name</label>
        <input className="form-control" type="text" name="last" />
        <label>E-mail</label>
        <input className="form-control" type="text" name="email" />
        <label>Password</label>
        <input className="form-control" type="password" name="password" />
        <label>Re-enter Password</label>
        <input className="form-control" type="password" name="password2" />
      </div>
      <input type="submit" className="btn btn-primary" value="Register" />
    </form>
  );
}

export default RegisterForm;
