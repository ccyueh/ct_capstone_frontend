import React, { Component } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import callAPI from '../../utils/api.js';
import getID from '../../utils/getID.js';
import ReactStars from 'react-stars';

class BottleButton extends Component {
  constructor() {
    super();

    this.state = {
      rating: {},
    }
  }

  retrieveRating = async(bottle_id, guest) => {
    let response_json = {'bottle_id': bottle_id};
    if (guest) {
      response_json['user_id'] = guest;
    }

    let data = await callAPI(
      'api/ratings/retrieve',
      'GET',
      response_json,
      false
    );

    if (data.rating) {
      return data.rating;
    } else if (data.star_ratings) {
      let avg = data.star_ratings.reduce((a, b) => a + b)/data.star_ratings.length;
      let rated = data.rated_by.length;
      return {'avg': avg, 'rated': rated};
    } else {
      return {};
    }
  }

  async componentDidMount() {
    let rating = await this.retrieveRating(this.props.guest);
    this.setState({ rating });
  }

  render() {
    return (
      <div className={"square " + (this.state.rating.stars ? 'bg-secondary' : 'bg-white center-vertical')}>
        {this.state.rating.stars &&
          <div className="star-button">
            <ReactStars
              count={5}
              value={Number(this.state.rating.stars)}
              color1="lightgray"
              color2="maroon"
              size={18}
              edit={false}
              half={true}
            />
          </div>
        }
        {this.state.rating.avg &&
            <div className="star-button">
            <ReactStars
              count={5}
              value={Number(this.state.rating.avg)}
              color1="lightgray"
              color2="maroon"
              size={18}
              edit={false}
              half={true}
            />
            </div>
        }
        {this.state.rating.rated &&
            <div className="rate-num">
              {this.state.rating.rated}
            </div>
        }
        <Link to={{
          pathname: "../bottle/rate",
          state: {
            bottle: this.props.bottle,
            user_id: this.props.guest,
            bottle_num: this.props.num,
            rating: this.state.rating,
          }
        }}>
        <h1 className={"bottle-num " + (this.state.rating.stars ? 'text-dark' : 'text-black')}>{this.props.num}</h1>
        </Link>
      </div>

    );
  }
}

export default BottleButton;
