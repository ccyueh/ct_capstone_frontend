import React, { Component } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import './index.css';
import ReactStars from 'react-stars';

class BottleButton extends Component {
  constructor() {
    super();

    this.state = {
      rating: {},
    }
  }

  retrieveRating = async(e) => {
    let URL = 'http://localhost:5000/api/ratings/retrieve?bottle_id=';
    URL += this.props.bottle.bottle_id;
    if (this.props.guest) {
      URL += '&user_id=' + this.props.guest
    }

    let response = await fetch(URL, {
      'method': 'GET',
      'headers': { 'Content-Type': 'application/json' }
    })

    let data = await response.json();
    if (data.success) {
      if (data.rating) {
        return data.rating;
      } else if (data.star_ratings) {
        let avg = data.star_ratings.reduce((a, b) => a + b)/data.star_ratings.length;
        let rated = data.rated_by.length;
        return {'avg': avg, 'rated': rated};
      }
    } else if (data.error) {
      alert(`${data.error}`);
    } else {
      alert('Sorry, try again.');
    }
  }

  async componentDidMount() {
    let rating = await this.retrieveRating();
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
          <div className="bottle-rate">
            <h3 className="float-left">{this.state.rating.avg}</h3>
            <h3 className="float-right">{this.state.rating.rated}</h3>
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
