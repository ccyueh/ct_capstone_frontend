import React, { Component } from 'react';
import './index.css';

class RatingForm extends Component {
  constructor() {
    super();

    this.state = {
      c0: '',
      c1: '',
      c2: '',
      c3: '',
      c4: '',
      c5: '',
    }
  }

  setCharacter = value => {
    let current = this.state['c' + value];
    if (current.length == 0) {
      this.setState({ ['c' + value]: value + 1 });
    } else {
      this.setState({ ['c' + value]: '' });
    }
  }

  render() {
    return (
      <form onSubmit={this.props.rateBottle}>
      <div className="form-group">
      <label>Stars</label>
      <input type="number" className="form-control" name="stars" />

      <div className="row">
      <div className="col-md-6">
      <label className="d-block">
        Bold
        <input type="checkbox" name="characteristics[0]" value={this.state.c0} onChange={() => this.setCharacter(0)} className="form-control" />
      </label>
      <label className="d-block">
        Fruity
        <input type="checkbox" name="characteristics[1]" value={this.state.c1} onChange={() => this.setCharacter(1)} className="form-control" />
      </label>
      <label className="d-block">
        Toasty
        <input type="checkbox" name="characteristics[2]" value={this.state.c2} onChange={() => this.setCharacter(2)} className="form-control" />
      </label>
      </div>
      <div className="col-md-6">
      <label className="d-block">
        Mild
        <input type="checkbox" name="characteristics[3]" value={this.state.c3} onChange={() => this.setCharacter(3)} className="form-control" />
      </label>
      <label className="d-block">
        Earthy
        <input type="checkbox" name="characteristics[4]" value={this.state.c4} onChange={() => this.setCharacter(4)} className="form-control" />
      </label>
      <label className="d-block">
        Oaky
      <input type="checkbox" name="characteristics[5]" value={this.state.c5} onChange={() => this.setCharacter(5)} className="form-control" />
      </label>
      </div>
      </div>

      <label>Tasting Notes</label>
      <textarea className="form-control" name="description" />
      </div>
      <button type="submit" className="btn btn-primary">Rate Bottle</button>
      </form>
    );
  }
}

export default RatingForm;
