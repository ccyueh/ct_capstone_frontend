import React from 'react';
import './index.css';

function LoginForm(props) {
  return (
    <form onSubmit={props.handleLogin}>
      <div className="form-group">
        <label>E-mail</label>
        <input type="text" className="form-control" name="email" />
        <label>Password</label>
        <input type="password" className="form-control" name="password" />
      </div>
      <button type="submit" className="btn btn-danger">Login</button>
    </form>
  );
}

export default LoginForm;
