import React, { Component } from 'react';
import './index.css';
import { Link } from 'react-router-dom';

class BottleButton extends Component {
  constructor() {
    super();

    this.state = {
      rating: {},
    }
  }

  retrieveRating = async(e) => {
    let URL = 'http://localhost:5000/api/ratings/retrieve?bottle_id=';
    URL += this.props.bottle_id;
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
      <div className={"square border rounded " + (this.state.rating.stars ? 'bg-light' : 'bg-white')}>
        {this.state.rating.stars &&
            <h3 className="bottle-rate">{this.state.rating.stars}</h3>
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
            bottle_id: this.props.bottle_id,
            user_id: this.props.guest
          }
        }}>
        <h1 className={"bottle-num " + (this.state.rating.stars ? 'text-secondary' : 'text-dark')}>{this.props.num}</h1>
        </Link>
      </div>

    );
  }
}

export default BottleButton;
