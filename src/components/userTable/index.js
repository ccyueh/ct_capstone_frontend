import React from 'react';
import './index.css';

function UserTable(props) {
  return (
    <div>
    <p>First Name: {props.user.first_name}</p>
    <p>Last Name: {props.user.last_name}</p>
    <img src="http://placehold.it/25x25" />
    <p>Reset password</p>
    </div>
  );
}

export default UserTable;
