import React, { Component } from 'react';
import './index.css';
import { withRouter } from 'react-router-dom';
import Format from '../../../components/format';
import RatingForm from '../../../components/ratingForm';
import BottleTable from '../../../components/bottleTable';
import callAPI from '../../../utils/api.js';
import getID from '../../../utils/getID.js';

class RateBottle extends Component {
  rateBottle = async(e) => {
    e.preventDefault();

    let props = this.props.history.location.state;
    let data_json = {};

    Object.values(e.target.elements).map(k => { if (k.name.length > 0) data_json[k.name] =  k.value } );
    data_json['user_id'] = getID(this.props.token);
    data_json['bottle_id'] = props.bottle.bottle_id;
    if (props.rating_id) {
      data_json['rating_id'] = props.rating_id;
    }

    let data = await callAPI(
      'api/ratings/save',
      'POST',
      false,
      data_json
    );

    if (data) {
      this.props.history.push('../bottle/party');
    }
  }

  render() {
    if (!this.props.history.location.state) {
      this.props.history.push('/');
      window.location.reload();
    }

    let props = this.props.history.location.state;
    if (props.voting && props.user_id) {
      return (
        <Format token={this.props.token} title="">
          <div className="bottle-placeholder">
            <div className="bottle-placeholder-text">
              <h5 className="text-white">Bottle</h5>
              <h1 className="text-white">
                {props.bottle_num}
              </h1>
            </div>
          </div>
          <RatingForm
            rateBottle={this.rateBottle}
            stars={props.stars ? props.stars : ""}
            description={props.description ? props.description: ""}
          />
        </Format>
      );
    }
    else {
      return(
        <BottleTable
          bottle={props.bottle}
          avg_rating={props.avg_rating}
          stars={props.stars}
          description={props.description}
        />
      );
    }
  }
}


export default withRouter(RateBottle);
