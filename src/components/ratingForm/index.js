import React, { Component } from 'react';
import './index.css';

class RatingForm extends Component {
  constructor() {
    super();

    this.state = {
      stars: '',
      description: '',
      characteristics: '',
      character: [],
    }
  }

  setCharacter = value => {
    let c = this.state.character;
    if (c.indexOf(value) == -1) {
      c.push(value);
    } else {
      c = c.filter(x => x != value);
    }
    this.setState({ 'character': c });
  }

  check = value => {
    if (this.state.characteristics.indexOf(value) != -1) {
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
        'characteristics': rating.characteristics
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.props.rateBottle}>
      <div className="form-group">
      <label>Stars</label>
      <input type="number" className="form-control" name="stars" defaultValue={this.state.stars} />

      <div className="row">
      <div className="col-md-6">
      <label className="d-block">
        Bold
        <input type="checkbox" onChange={() => this.setCharacter(1)} className="form-control" defaultChecked={this.check("bold")} />
      </label>
      <label className="d-block">
        Fruity
        <input type="checkbox" onChange={() => this.setCharacter(2)} className="form-control" defaultChecked={this.check("fruity")} />
      </label>
      <label className="d-block">
        Toasty
        <input type="checkbox" onChange={() => this.setCharacter(3)} className="form-control" defaultChecked={this.check("toasty")} />
      </label>
      </div>
      <div className="col-md-6">
      <label className="d-block">
        Mild
        <input type="checkbox" onChange={() => this.setCharacter(4)} className="form-control" defaultChecked={this.check("mild")} />
      </label>
      <label className="d-block">
        Earthy
        <input type="checkbox" onChange={() => this.setCharacter(5)} className="form-control" defaultChecked={this.check("earthy")} />
      </label>
      <label className="d-block">
        Oaky
      <input type="checkbox" onChange={() => this.setCharacter(6)} className="form-control" defaultChecked={this.check("oaky")} />
      </label>
      </div>
      </div>
      <input readOnly type="text" name="characteristics" value={this.state.character} className="d-none" />
      <label>Tasting Notes</label>
      <textarea className="form-control" name="description" value={this.state.description} onChange={this.updateDesc} />
      </div>
      <button type="submit" className="btn btn-primary">Rate Bottle</button>
      </form>
    );
  }
}

export default RatingForm;
