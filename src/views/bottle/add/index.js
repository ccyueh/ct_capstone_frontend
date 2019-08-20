import React, { Component } from 'react';
import './index.css';
import Form from '../../../components/form';
import BottleForm from '../../../components/bottleForm';

class AddBottle extends Component {
  addBottle = async(e) => {
    e.preventDefault();

    let token = this.props.token;
    let user_id = JSON.parse(atob(token.split('.')[1])).user_id;
    let data_json = {};

    Object.values(e.target.elements).map(k => { if (k.name.length > 0) data_json[k.name] =  k.value } );
    data_json['user_id'] = user_id;
    data_json['party_id'] = localStorage.getItem('party_id');

    const URL = 'http://localhost:5000/api/bottles/save';

    let response = await fetch(URL, {
      'method': 'POST',
      'headers': { 'Content-Type': 'application/json' },
      'body': JSON.stringify(data_json)
    })

    let data = await response.json();

    if (data.success) {
      alert(`${data.success}`);
    } else if (data.error) {
      alert(`${data.error}`);
    } else {
      alert('Sorry, try again.');
    }
  }

  render() {
    if (this.props.token) {
      return (
        <Form title="Add Bottle Details">
          <BottleForm addBottle={this.addBottle} />
        </Form>
      );
    } else {
        return (
          <div>You must be logged in to view this page.</div>
        );
    }
  }
}


export default AddBottle;
