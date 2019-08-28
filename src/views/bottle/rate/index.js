import React, { Component } from 'react';
import './index.css';
import { withRouter } from 'react-router-dom';
import Form from '../../../components/form';
import RatingForm from '../../../components/ratingForm';
import RatingTable from '../../../components/ratingTable';
import BottleTable from '../../../components/bottleTable';

class RateBottle extends Component {
  rateBottle = async(e) => {
    e.preventDefault();

    let token = this.props.token;
    let user_id = JSON.parse(atob(token.split('.')[1])).user_id;
    let data_json = {};

    Object.values(e.target.elements).map(k => { if (k.name.length > 0) data_json[k.name] =  k.value } );
    data_json['user_id'] = user_id;
    data_json['bottle_id'] = this.props.history.location.state.bottle.bottle_id;
    data_json['terms'] = data_json['terms'].split(',');
    if (this.props.history.location.state.rating.rating_id) {
      data_json['rating_id'] = this.props.history.location.state.rating.rating_id;
    }
    
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
    //console.log(this.props.history.location.state.user_id);
    //console.log(this.props.history.location.state);
    if (this.props.token) {
      if (this.props.history.location.state.user_id) {
        return (
          <Form title={false}>
          <div className="bottle-placeholder">
          <div className="bottle-placeholder-text">
          <h5 className="text-white">Bottle</h5>
          <h1 className="text-white">
          {this.props.history.location.state.bottle_num}
          </h1>
          </div>
          </div>
          {/*Object.keys(this.props.history.location.state.rating).length > 0 &&
            <div>
            <RatingTable rating={this.props.history.location.state.rating} />
            <h1>Edit Rating</h1>
            </div>
          */}
          <RatingForm
            rateBottle={this.rateBottle}
            rating={this.props.history.location.state.rating ? this.props.history.location.state.rating : {}}
            terms={this.props.history.location.state.terms}
          />
          </Form>
        );
      }
    else {
      return(
        <Form title={false}>
        <BottleTable bottle={this.props.history.location.state.bottle} />
        </Form>
      );
    }
    } else {
        return (
          <div>You must be logged in to view this page.</div>
        );
    }
  }
}


export default withRouter(RateBottle);
