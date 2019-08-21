import React, { Component } from 'react';
import './index.css';
import { withRouter } from 'react-router-dom';
import Form from '../../../components/form';
import RatingForm from '../../../components/ratingForm';
import RatingTable from '../../../components/ratingTable';

class RateBottle extends Component {
  rateBottle = async(e) => {
    e.preventDefault();

    let token = this.props.token;
    let user_id = JSON.parse(atob(token.split('.')[1])).user_id;
    let data_json = {};

    Object.values(e.target.elements).map(k => { if (k.name.length > 0) data_json[k.name] =  k.value } );
    data_json['user_id'] = user_id;
    data_json['bottle_id'] = this.props.history.location.state.bottle_id;
    data_json['characteristics'] = data_json['characteristics'].split(',');

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
    console.log(this.props.history.location.state);
    if (this.props.token) {
      return (
        <Form title={false}>
          <div className="bg-danger">
            <h5 className="text-white">Bottle</h5>
            <h1 className="text-white">
              {this.props.history.location.state.bottle_num}
            </h1>
          </div>
          {Object.keys(this.props.history.location.state.rating).length > 0 &&
          <div>
          <RatingTable rating={this.props.history.location.state.rating} />
          <h1>Edit Rating</h1>
          </div>
          }
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
