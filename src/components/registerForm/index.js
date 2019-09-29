import React from 'react';
import './index.css';

function RegisterForm(props) {
  return (
    <form onSubmit={props.handleRegister}>
      <div className="form-group">
        <label>First Name</label>
        <input className="form-control" type="text" name="first" required />
        <label>Last Name</label>
        <input className="form-control" type="text" name="last" required />
        <label>E-mail</label>
        <input className="form-control" type="email" name="email" required />
        <label>Password</label>
        <input className="form-control" type="password" name="password" required />
        <label>Re-enter Password</label>
        <input className="form-control" type="password" name="password2" required />
      </div>
      <input type="submit" className="btn btn-danger" value="Register" />
    </form>
  );
}

export default RegisterForm;
