import React, { Component } from 'react';
import './index.css';
import { withRouter } from 'react-router-dom';
import Format from '../../../components/format';
import RatingForm from '../../../components/ratingForm';
import RatingTable from '../../../components/ratingTable';
import BottleTable from '../../../components/bottleTable';
import callAPI from '../../../utils/api.js';
import getID from '../../../utils/getID.js';

class RateBottle extends Component {
  rateBottle = async(e) => {
    e.preventDefault();

    let data_json = {};

    Object.values(e.target.elements).map(k => { if (k.name.length > 0) data_json[k.name] =  k.value } );
    data_json['user_id'] = getID(this.props.token);
    data_json['bottle_id'] = this.props.history.location.state.bottle.bottle_id;
    if (this.props.history.location.state.rating.rating_id) {
      data_json['rating_id'] = this.props.history.location.state.rating.rating_id;
    }

    let data = await callAPI(
      'api/ratings/save',
      'POST',
      false,
      data_json
    );

    if (data) {
      this.props.history.push({
        pathname: '../bottle/party',
        state: {
          token: this.props.token
        }
      });
    }
  }

  render() {
    if (this.props.token) {
      if (this.props.history.location.state.user_id) {
        return (
          <Format title={false}>
          <div className="bottle-placeholder">
          <div className="bottle-placeholder-text">
          <h5 className="text-white">Bottle</h5>
          <h1 className="text-white">
          {this.props.history.location.state.bottle_num}
          </h1>
          </div>
          </div>
          <RatingForm
            rateBottle={this.rateBottle}
            rating={this.props.history.location.state.rating ? this.props.history.location.state.rating : {}}
          />
          </Format>
        );
      }
    else {
      return(
        <Format title={false}>
        <BottleTable bottle={this.props.history.location.state.bottle} />
        </Format>
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
