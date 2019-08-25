import React, { Component } from 'react';
import './index.css';
import ReactStars from 'react-stars';

class RatingForm extends Component {
  constructor(props) {
    super();

    this.state = {
      stars: '',
      description: '',
      terms: props.terms,
      checked: [],
    }
  }

  retrieveTerm = async(term_id) => {
    let URL = 'http://localhost:5000/api/terms/retrieve?term_id=';
    URL += term_id;

    let response = await fetch(URL, {
      'method': 'GET',
      'headers': { 'Content-Type': 'application/json' }
    })

    let data = await response.json();
    if (data.success) {
      return data.term;
    } else if (data.error) {
      alert(`${data.error}`);
    } else {
      alert('Sorry, try again.');
    }
  }

  setCheck = value => {
    let c = this.state.checked;
    if (c.indexOf(value) == -1) {
      c.push(value);
    } else {
      c = c.filter(x => x != value);
    }
    this.setState({ 'checked': c });
  }

  check = value => {
    if (this.state.checked.indexOf(value) != -1) {
      return "checked";
    }
  }

  updateDesc = e => {
    this.setState({ 'description': e.target.value });
  }

  async componentDidMount() {
    let rating = this.props.rating;

    if (rating.rating_id) {
      this.setState({
        'stars': rating.stars,
        'description': rating.description,
        'checked': Object.keys(rating.terms)
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
              size={72}
            />
          </div>

          <div className="row checkbox-cols">
            {[0,3].map(x =>
              <div className="col" key={x}>
                {[0,1,2].map(y =>
                  <label className="character-label" key={y}>
                    {Object.values(this.state.terms)[x+y]}
                    <div className="checkbox-border">
                      <input
                        type="checkbox"
                        onClick={() => this.setCheck(String(x+y))}
                        className="form-control"
                        defaultChecked={this.check(Object.keys(this.state.terms)[x+y])}
                      />
                    </div>
                  </label>
                )}
              </div>
            )}
          </div>

          <input readOnly type="text" name="terms" value={this.state.checked} className="d-none" />
          <input readOnly type="text" name="stars" value={this.state.stars} className="d-none" />

          <label>Your Notes</label>
          <textarea className="form-control" name="description" value={this.state.description} onChange={this.updateDesc} />
        </div>
        <button type="submit" className="btn btn-danger">
          {this.state.stars ? "Update" : "Submit" } Rating
        </button>
      </form>
    );
  }
}

export default RatingForm;
