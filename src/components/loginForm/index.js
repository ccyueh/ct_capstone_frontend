import React from 'react';
import './index.css';

function LoginForm(props) {
  //<input type="checkbox" defaultChecked="checked" />
  return (
    <form onSubmit={props.handleLogin}>
      <div className="form-group">
        <label>E-mail</label>
        <input type="text" className="form-control" name="email" />
        <label>Password</label>
        <input type="password" className="form-control" name="password" />
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  );
}

export default LoginForm;
