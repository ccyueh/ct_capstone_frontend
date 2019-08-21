import React, { Component } from 'react';
import './index.css';
import { withRouter } from 'react-router-dom';
import Form from '../../../components/form';
import RatingForm from '../../../components/ratingForm';

class RateBottle extends Component {
  rateBottle = async(e) => {
    e.preventDefault();

    let token = this.props.token;
    let user_id = JSON.parse(atob(token.split('.')[1])).user_id;
    let data_json = {};
    let characteristics = [];

    Object.values(e.target.elements).map(k => { if (k.name.length > 0) if (k.name.slice(0, 15) == 'characteristics' && k.value.length > 0) characteristics.push(k.value); else data_json[k.name] =  k.value } );
    data_json['user_id'] = user_id;
    data_json['bottle_id'] = this.props.history.location.state.bottle_id;
    data_json['characteristics'] = characteristics;

    const URL = 'http://localhost:5000/api/ratings/save';

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
        <Form title="Rate Bottle">
          <RatingForm rateBottle={this.rateBottle} />
        </Form>
      );
    } else {
        return (
          <div>You must be logged in to view this page.</div>
        );
    }
  }
}


export default withRouter(RateBottle);
