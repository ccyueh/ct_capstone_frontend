import React, { Component } from 'react';
import './index.css';
import BottleForm from '../../../components/bottleForm';

class AddBottle extends Component {
  addBottle = async(e) => {
    e.preventDefault();

    let data_json = {};
    Object.values(e.target.elements).map(k => { if (k.name.length > 0) data_json[k.name] =  k.value } );

    let URL = 'http://localhost:5000/api/bottles/save';

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
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1>Add Bottle</h1>
            <BottleForm addBottle={this.addBottle} />
          </div>
        </div>
      </div>
    );
  }
}

export default AddBottle;
