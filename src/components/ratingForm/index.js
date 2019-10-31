import React, { Component } from 'react';
import './index.css';
import ReactStars from 'react-stars';

class RatingForm extends Component {
  constructor(props) {
    super();

    this.state = {
      stars: '',
      description: '',
    }
  }

  updateDesc = e => {
    this.setState({ 'description': e.target.value });
  }

  async componentDidMount() {
    if (this.props.stars) {
      this.setState({
        'stars': this.props.stars,
        'description': this.props.description,
      });
    }
  }

  render() {
    const ratingChanged = (newRating) => {
      this.setState({ 'stars': newRating });
    }
    return (
      <form onSubmit={this.props.rateBottle}>
        <div className="form-group">

          <div className="star-container">
            <ReactStars
              value={Number(this.state.stars)}
              onChange={ratingChanged}
              color1="lightgray"
              size={40}
            />
          </div>

          <input readOnly type="text" name="stars" value={this.state.stars} className="d-none" />

          <label>Personal Notes</label>
          <textarea className="form-control" name="description" value={this.state.description} onChange={this.updateDesc} />
        </div>
        <button type="submit" className="btn btn-danger">
          {this.props.stars ? "Update" : "Submit" } Rating
        </button>
      </form>
    );
  }
}

export default RatingForm;
