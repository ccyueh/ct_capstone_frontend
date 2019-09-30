import React, { Component } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import callAPI from '../../utils/api.js';
import ReactStars from 'react-stars';

class BottleButton extends Component {
  constructor() {
    super();

    this.state = {
      avg_rating: '',
      rated_by: '',
      stars: '',
      description: ''
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
      if (data.star_ratings.length > 0) {
        let avg = data.star_ratings.reduce((a, b) => a + b)/data.star_ratings.length;
        let rated = data.rated_by.length;
        return {'avg': avg, 'rated': rated};
      } else {
        return {'avg': 0, 'rated': 0};
      }
    } else {
      return {};
    }
  }

  async componentDidMount() {
    let rating = await this.retrieveRating(this.props.bottle.bottle_id, false);
    let avg_rating = rating.avg;
    let rated_by = rating.rated;

    let user_rating = await this.retrieveRating(this.props.bottle.bottle_id, this.props.user_id);
    let rating_id = user_rating.rating_id ? user_rating.rating_id : false;
    let stars = user_rating.stars ? user_rating.stars : false;
    let description = user_rating.description ? user_rating.description : false;

    this.setState({ avg_rating, rated_by, stars, description, rating_id });
  }

  render() {
    return (
      <div className="bottle-rank">
        { this.props.button_size < 3 &&
          <span>
            {this.props.button_size+1}
            {this.props.button_size == 0 && "st"}
            {this.props.button_size == 1 && "nd"}
            {this.props.button_size == 2 && "rd"}
          </span>
        }
        <div className={"square " +
          (this.state.stars &&
            this.props.voting ?
            'bg-secondary ' : 'bg-white center-vertical ') + (this.props.button_size < 3 ? 'enlarge': '')}>
          { this.state.stars &&
            this.props.voting &&
            <div className="star-button">
              <ReactStars
                count={5}
                value={Number(this.state.stars)}
                color1="lightgray"
                color2="maroon"
                size={18}
                edit={false}
                half={true}
              />
            </div>
          }
          <div className="rate-num">
          { this.state.rated_by > 0 &&
            !this.props.guest &&
            this.props.voting &&
            this.state.rated_by
          }
          </div>
          <Link to={{
            pathname: "../bottle/rate",
            state: {
              bottle: this.props.bottle,
              user_id: this.props.user_id,
              bottle_num: this.props.num,
              avg_rating: this.state.avg_rating,
              stars: this.state.stars,
              description: this.state.description,
              rating_id: this.state.rating_id,
              voting: this.props.voting,
            }
          }}>
          <h1 className={"bottle-num " + (this.state.stars ? 'text-dark' : 'text-black')}>{this.props.num}</h1>
          </Link>
        </div>
      </div>
    );
  }
}

export default BottleButton;
